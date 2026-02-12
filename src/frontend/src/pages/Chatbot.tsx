import { PageTitle } from '../designB/components/DesignBTypography';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { useAssistantTranscript } from '../components/assistant/useAssistantTranscript';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { interpretCommand } from '../components/assistant/assistantBrain';
import { AssistantStatus, ReportAnalysisContext } from '../components/assistant/assistantTypes';
import { getErrorFallbackResponse } from '../components/assistant/medicalKnowledgeBase';
import { useMedicalFiles, MedicalFileMetadata } from '../hooks/useMedicalFiles';
import { extractTextFromBytes } from '../components/assistant/reportTextExtraction';
import { analyzeReportText, formatAnalysisMessage } from '../components/assistant/reportAnalysis';

export default function Chatbot() {
  // Protect this route - redirect to signin if not authenticated
  useRequireAuth();

  const navigate = useNavigate();
  const { transcript, addMessage, clearTranscript } = useAssistantTranscript();
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const { files, getFileBytes } = useMedicalFiles();
  const [reportContext, setReportContext] = useState<ReportAnalysisContext>({ state: 'idle' });

  const handleCommand = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    addMessage('user', userInput);
    setInputValue('');
    setStatus('processing');
    setErrorMessage(undefined);

    try {
      // Check if we're in a report analysis flow
      if (reportContext.state === 'awaiting-selection') {
        // User is selecting a report by number or name
        const selection = userInput.trim();
        const selectedIndex = parseInt(selection) - 1;

        let selectedFile: MedicalFileMetadata | undefined = undefined;
        if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < files.length) {
          selectedFile = files[selectedIndex];
        } else {
          // Try to match by filename
          selectedFile = files.find(f => 
            f.filename.toLowerCase().includes(selection.toLowerCase())
          );
        }

        if (!selectedFile) {
          addMessage('assistant', `I couldn't find that report. Please enter the number (1-${files.length}) or part of the filename.`);
          setStatus('idle');
          return;
        }

        // Attempt to extract text from the file
        addMessage('assistant', `Reading "${selectedFile.filename}"...`);
        
        try {
          const bytes = await getFileBytes(selectedFile.id);
          if (!bytes) {
            addMessage('assistant', `I couldn't access that file. Please try again or upload it again.`);
            setReportContext({ state: 'idle' });
            setStatus('idle');
            return;
          }

          const extractionResult = await extractTextFromBytes(
            bytes,
            selectedFile.filename,
            selectedFile.contentType
          );

          if (extractionResult.success && extractionResult.text) {
            // Successfully extracted text - analyze it
            setReportContext({ state: 'analyzing' });
            const analysis = analyzeReportText(extractionResult.text, selectedFile.filename);
            const message = formatAnalysisMessage(analysis, selectedFile.filename);
            addMessage('assistant', message);
            setReportContext({ state: 'idle' });
            setStatus('idle');
          } else {
            // Could not extract text - ask user to paste it
            setReportContext({
              state: 'awaiting-paste',
              selectedReportId: selectedFile.id,
              selectedReportFilename: selectedFile.filename,
            });
            addMessage('assistant', `I couldn't automatically read the text from "${selectedFile.filename}" (it may be a PDF, image, or binary format).\n\nPlease paste the key text or values from your report into the chat, and I'll help you understand them.`);
            setStatus('idle');
          }
        } catch (error) {
          console.error('Error reading file:', error);
          addMessage('assistant', `I encountered an error reading that file. Please try again or paste the report text directly.`);
          setReportContext({ state: 'idle' });
          setStatus('idle');
        }
        return;
      }

      if (reportContext.state === 'awaiting-paste') {
        // User is pasting report text
        const pastedText = userInput.trim();
        
        if (pastedText.length < 20) {
          addMessage('assistant', `That seems quite short. Please paste more details from your report so I can provide a better analysis.`);
          setStatus('idle');
          return;
        }

        // Analyze the pasted text
        setReportContext({ state: 'analyzing' });
        const analysis = analyzeReportText(pastedText, reportContext.selectedReportFilename || 'Your Report');
        const message = formatAnalysisMessage(analysis, reportContext.selectedReportFilename || 'Your Report');
        addMessage('assistant', message);
        setReportContext({ state: 'idle' });
        setStatus('idle');
        return;
      }

      // Normal command interpretation
      const result = interpretCommand(userInput, transcript);

      // Handle report listing request
      if (result.type === 'report-list') {
        if (files.length === 0) {
          addMessage('assistant', `You don't have any saved medical reports yet.\n\nTo analyze a report:\n1. Go to the Reports page\n2. Upload your medical report\n3. Come back and ask me to analyze it\n\nYou can also paste report text directly into this chat for analysis.`);
          setStatus('idle');
          return;
        }

        // List available reports
        let listMessage = `I found ${files.length} saved report${files.length === 1 ? '' : 's'}:\n\n`;
        files.forEach((file, index) => {
          listMessage += `${index + 1}. ${file.filename}\n`;
        });
        listMessage += `\nWhich report would you like me to analyze? Enter the number (1-${files.length}) or part of the filename.`;

        addMessage('assistant', listMessage);
        setReportContext({ state: 'awaiting-selection' });
        setStatus('idle');
        return;
      }

      // Handle navigation
      if (result.type === 'navigation' && result.navigationTarget) {
        addMessage('assistant', result.message);
        setStatus('idle');
        
        // Navigate immediately after adding confirmation message
        setTimeout(() => {
          navigate({ to: result.navigationTarget as '/' | '/signin' | '/home' | '/profile' | '/chat' });
        }, 100);
      } else if (result.type === 'medical') {
        // Add medical response
        addMessage('assistant', result.message);
        setStatus('idle');
      } else {
        // Add assistant response
        addMessage('assistant', result.message);
        setStatus('idle');
      }
    } catch (error) {
      // On error, add a fallback assistant message and return to idle
      console.error('Error processing command:', error);
      addMessage('assistant', getErrorFallbackResponse());
      setReportContext({ state: 'idle' });
      setStatus('idle');
    }
  }, [addMessage, navigate, transcript, files, getFileBytes, reportContext]);

  const handleSendMessage = useCallback(() => {
    handleCommand(inputValue);
  }, [inputValue, handleCommand]);

  const handleVoiceInput = useCallback((text: string) => {
    if (text.trim()) {
      handleCommand(text);
    }
  }, [handleCommand]);

  const handleClearConversation = useCallback(() => {
    clearTranscript();
    setStatus('idle');
    setErrorMessage(undefined);
    setInputValue('');
    setReportContext({ state: 'idle' });
  }, [clearTranscript]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 container max-w-4xl mx-auto px-4 pt-8 pb-4">
        <PageTitle>Medical Assistant</PageTitle>
        <p className="text-muted-foreground mt-2">
          Ask me about symptoms, medications, or general health questions. I can also analyze your medical reports.
        </p>
      </div>

      {/* Chat Panel - Flexible, Scrollable */}
      <div className="flex-1 min-h-0 container max-w-4xl mx-auto px-4 pb-8">
        <div className="h-full border border-border rounded-lg overflow-hidden bg-card">
          <AssistantPanel
            transcript={transcript}
            status={status}
            errorMessage={errorMessage}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            onClearConversation={handleClearConversation}
          />
        </div>
      </div>
    </div>
  );
}
