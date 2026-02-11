import { DashboardSectionHeader } from '../designB/components/DashboardSectionHeader';
import { DashboardTile } from '../designB/components/DashboardTile';
import { DesignBSurface } from '../designB/components/DesignBSurface';
import { PageTitle } from '../designB/components/DesignBTypography';
import { 
  Activity, 
  Heart, 
  Droplet, 
  Moon, 
  Footprints, 
  Flame,
  Pill,
  Apple,
  Dumbbell,
  Stethoscope,
  Brain,
  AlertCircle,
  MessageSquare,
  FileText,
  XCircle
} from 'lucide-react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useNavigate } from '@tanstack/react-router';

export default function HomeDashboard() {
  // Protect this route - redirect to signin if not authenticated
  useRequireAuth();
  const navigate = useNavigate();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <PageTitle>Health Dashboard</PageTitle>

      {/* Today's Metrics Section */}
      <section className="space-y-4">
        <DashboardSectionHeader
          title="Today's Metrics"
          caption="Your health snapshot for today"
        />
        
        {/* Hero Card */}
        <DesignBSurface variant="elevated" className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Overall Health Score</p>
              <p className="text-4xl font-bold text-primary">87/100</p>
              <p className="text-sm text-muted-foreground">Great progress today!</p>
            </div>
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="h-10 w-10 text-primary" />
            </div>
          </div>
        </DesignBSurface>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardTile
            icon={Heart}
            label="Heart Rate"
            value="72 bpm"
            colorAccent="pink"
            size="sm"
          />
          <DashboardTile
            icon={Droplet}
            label="Hydration"
            value="6/8 cups"
            colorAccent="blue"
            size="sm"
          />
          <DashboardTile
            icon={Moon}
            label="Sleep"
            value="7.5 hrs"
            colorAccent="indigo"
            size="sm"
          />
          <DashboardTile
            icon={Footprints}
            label="Steps"
            value="8,432"
            colorAccent="green"
            size="sm"
          />
          <DashboardTile
            icon={Flame}
            label="Calories"
            value="1,850"
            colorAccent="amber"
            size="sm"
          />
          <DashboardTile
            icon={Activity}
            label="Active Min"
            value="45 min"
            colorAccent="purple"
            size="sm"
          />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="space-y-4">
        <DashboardSectionHeader
          title="Quick Actions"
          caption="Access key features instantly"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardTile
            icon={MessageSquare}
            label="Medical Chatbot"
            colorAccent="purple"
            onClick={() => navigate({ to: '/chat' })}
          />
          <DashboardTile
            icon={FileText}
            label="Medical Reports"
            colorAccent="blue"
            onClick={() => navigate({ to: '/report' })}
          />
          <DashboardTile
            icon={Pill}
            label="Log Medication"
            colorAccent="pink"
            onClick={() => console.log('Log medication')}
          />
          <DashboardTile
            icon={Apple}
            label="Log Meal"
            colorAccent="green"
            onClick={() => console.log('Log meal')}
          />
          <DashboardTile
            icon={Dumbbell}
            label="Log Exercise"
            colorAccent="blue"
            onClick={() => console.log('Log exercise')}
          />
          <DashboardTile
            icon={XCircle}
            label="Log Avoid"
            colorAccent="amber"
            onClick={() => console.log('Log avoid')}
          />
        </div>
      </section>

      {/* ML Prediction Categories Section */}
      <section className="space-y-4">
        <DashboardSectionHeader
          title="Health Insights"
          caption="AI-powered predictions and recommendations"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardTile
            icon={Heart}
            label="Heart Health"
            colorAccent="pink"
            onClick={() => console.log('View heart health predictions')}
          />
          <DashboardTile
            icon={Brain}
            label="Mental Wellness"
            colorAccent="purple"
            onClick={() => console.log('View mental wellness predictions')}
          />
          <DashboardTile
            icon={Droplet}
            label="Diabetes Risk"
            colorAccent="blue"
            onClick={() => console.log('View diabetes risk predictions')}
          />
          <DashboardTile
            icon={Stethoscope}
            label="General Health"
            colorAccent="green"
            onClick={() => console.log('View general health predictions')}
          />
          <DashboardTile
            icon={AlertCircle}
            label="PCOD & PCOS Risks"
            colorAccent="amber"
            onClick={() => console.log('View PCOD & PCOS risk predictions')}
          />
          <DashboardTile
            icon={Dumbbell}
            label="Fitness Goals"
            colorAccent="indigo"
            onClick={() => console.log('View fitness predictions')}
          />
        </div>
      </section>
    </div>
  );
}
