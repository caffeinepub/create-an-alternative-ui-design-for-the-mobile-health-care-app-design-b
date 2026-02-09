import { Outlet, useLocation } from '@tanstack/react-router';
import { DesignBBottomTabs } from './DesignBBottomTabs';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { AssistantWidget } from '../../components/assistant/AssistantWidget';
import { Heart } from 'lucide-react';

export function DesignBAppShell() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/generated/healthcare-logo.dim_512x512.png" 
              alt="HealthCare" 
              className="h-8 w-8"
            />
            <span className="font-bold text-lg">HealthCare</span>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {!hideNavigation && <DesignBBottomTabs />}

      {/* Voice Assistant - only show on routes with navigation */}
      {!hideNavigation && <AssistantWidget />}

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <p>
          © 2026. Built with <Heart className="inline h-4 w-4 text-destructive fill-destructive" /> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
