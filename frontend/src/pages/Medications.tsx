import { useRequireAuth } from '../hooks/useRequireAuth';
import { CloseButton } from '../components/CloseButton';
import { PageTitle, BodyText } from '../designB/components/DesignBTypography';
import { DesignBSurface } from '../designB/components/DesignBSurface';
import { Pill, Clock, Bell, CheckCircle2 } from 'lucide-react';

export default function Medications() {
  useRequireAuth();

  const medications = [
    {
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      time: '9:00 AM',
      taken: true,
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '8:00 AM, 8:00 PM',
      taken: true,
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '9:00 AM',
      taken: false,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-24">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <CloseButton />
        
        {/* Header - Centered */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Pill className="h-8 w-8 text-primary" />
            </div>
          </div>
          <PageTitle>Medications</PageTitle>
          <BodyText className="text-muted-foreground">
            Manage your prescriptions and track medication adherence
          </BodyText>
        </div>

        {/* Today's Schedule - Centered */}
        <DesignBSurface variant="elevated" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
          </div>
          <div className="space-y-4">
            {medications.map((med, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 rounded-lg border border-border bg-background/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{med.name}</h3>
                    {med.taken && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{med.time}</span>
                  </div>
                </div>
                {!med.taken && (
                  <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors">
                    Mark Taken
                  </button>
                )}
              </div>
            ))}
          </div>
        </DesignBSurface>

        {/* Reminders - Centered */}
        <DesignBSurface variant="elevated" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Reminders</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <span className="text-sm">Morning medications</span>
              <span className="text-sm text-muted-foreground">9:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <span className="text-sm">Evening medications</span>
              <span className="text-sm text-muted-foreground">8:00 PM</span>
            </div>
          </div>
        </DesignBSurface>

        {/* Stats - Centered */}
        <div className="grid grid-cols-2 gap-4">
          <DesignBSurface variant="elevated" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="text-sm text-muted-foreground mt-1">Adherence Rate</p>
          </DesignBSurface>
          <DesignBSurface variant="elevated" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground mt-1">Active Prescriptions</p>
          </DesignBSurface>
        </div>
      </div>
    </div>
  );
}
