import { useNavigate, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/report', label: 'Reports', icon: FileText },
  { path: '/profile', label: 'Profile', icon: User },
];

export function DesignBBottomTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Button
              key={tab.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: tab.path })}
              className={cn(
                'flex flex-col items-center gap-1 h-auto py-2 px-4',
                isActive && 'text-primary'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'fill-primary/20')} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
