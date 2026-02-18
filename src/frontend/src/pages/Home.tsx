import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { DashboardSectionHeader } from '../designB/components/DashboardSectionHeader';
import { DashboardTile } from '../designB/components/DashboardTile';
import { DesignBSurface } from '../designB/components/DesignBSurface';
import { PageTitle, BodyText } from '../designB/components/DesignBTypography';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { CloseButton } from '../components/CloseButton';
import {
  Activity,
  Heart,
  Droplet,
  TrendingUp,
  MessageSquare,
  FileText,
  PenLine,
  Brain,
  Dumbbell,
  Apple,
  Moon,
  Pill,
} from 'lucide-react';

export default function Home() {
  useRequireAuth();
  const navigate = useNavigate();

  // Track which Quick Action tile is active
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const handleTileClick = (tileId: string, path: string) => {
    setActiveTile(tileId);
    setTimeout(() => {
      navigate({ to: path });
      setActiveTile(null);
    }, 200);
  };

  const handleTileClose = (tileId: string) => {
    setActiveTile(null);
  };

  return (
    <div className="space-y-8 pb-24">
      <CloseButton />
      
      {/* Header */}
      <div className="space-y-2">
        <PageTitle>Health Dashboard</PageTitle>
        <BodyText className="text-muted-foreground">
          Track your wellness journey and stay on top of your health goals.
        </BodyText>
      </div>

      {/* Today's Metrics */}
      <section>
        <DashboardSectionHeader
          title="Today's Metrics"
          caption="Your health snapshot for today"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DesignBSurface variant="elevated" className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Heart Rate</span>
            </div>
            <p className="text-2xl font-bold">72 bpm</p>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </DesignBSurface>

          <DesignBSurface variant="elevated" className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-medium">Steps</span>
            </div>
            <p className="text-2xl font-bold">8,432</p>
            <p className="text-xs text-muted-foreground">84% of goal</p>
          </DesignBSurface>

          <DesignBSurface variant="elevated" className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Droplet className="h-5 w-5" />
              <span className="text-sm font-medium">Hydration</span>
            </div>
            <p className="text-2xl font-bold">6 cups</p>
            <p className="text-xs text-muted-foreground">75% of goal</p>
          </DesignBSurface>

          <DesignBSurface variant="elevated" className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Calories</span>
            </div>
            <p className="text-2xl font-bold">1,842</p>
            <p className="text-xs text-muted-foreground">Goal: 2,000</p>
          </DesignBSurface>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <DashboardSectionHeader
          title="Quick Actions"
          caption="Access your health tools"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardTile
            icon={MessageSquare}
            label="Medical Chatbot"
            caption="Ask health questions"
            colorAccent="primary"
            size="lg"
            onClick={() => handleTileClick('chatbot', '/chat')}
            isActive={activeTile === 'chatbot'}
            onClose={() => handleTileClose('chatbot')}
          />
          <DashboardTile
            icon={FileText}
            label="Medical Reports"
            caption="View and upload reports"
            colorAccent="accent"
            size="lg"
            onClick={() => handleTileClick('reports', '/report')}
            isActive={activeTile === 'reports'}
            onClose={() => handleTileClose('reports')}
          />
          <DashboardTile
            icon={PenLine}
            label="Log"
            caption="Track daily health metrics"
            colorAccent="accent"
            size="lg"
            onClick={() => handleTileClick('log', '/home')}
            isActive={activeTile === 'log'}
            onClose={() => handleTileClose('log')}
          />
        </div>
      </section>

      {/* ML Health Insights */}
      <section>
        <DashboardSectionHeader
          title="ML Health Insights"
          caption="AI-powered health recommendations"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardTile
            icon={Brain}
            label="Mental Health"
            caption="Stress & mood tracking"
            colorAccent="primary"
          />
          <DashboardTile
            icon={Dumbbell}
            label="Fitness"
            caption="Exercise recommendations"
            colorAccent="accent"
          />
          <DashboardTile
            icon={Apple}
            label="Nutrition"
            caption="Dietary insights"
            colorAccent="accent"
          />
          <DashboardTile
            icon={Moon}
            label="Sleep"
            caption="Rest quality analysis"
            colorAccent="primary"
          />
          <DashboardTile
            icon={Pill}
            label="Medications"
            caption="Prescription reminders"
            colorAccent="accent"
            onClick={() => handleTileClick('medications', '/medications')}
            isActive={activeTile === 'medications'}
            onClose={() => handleTileClose('medications')}
          />
        </div>
      </section>
    </div>
  );
}
