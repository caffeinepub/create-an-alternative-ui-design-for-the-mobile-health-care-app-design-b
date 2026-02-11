import { Outlet, useLocation } from '@tanstack/react-router';
import { DesignBBottomTabs } from './DesignBBottomTabs';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { AssistantWidget } from '../../components/assistant/AssistantWidget';
import { Heart, User } from 'lucide-react';
import { useUserDisplayName } from '../../hooks/useUserDisplayName';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { hasValidSession } from '../../auth/session';

export function DesignBAppShell() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';
  const displayName = useUserDisplayName();
  const { identity, isInitializing } = useInternetIdentity();
  
  // Show user name only on authenticated routes (not on welcome/signin/signup)
  // Use validated session check to ensure stale sessions don't show authenticated UI
  const showUserName = !hideNavigation && (
    (!isInitializing && identity && !identity.getPrincipal().isAnonymous()) ||
    hasValidSession()
  );

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
          <div className="flex items-center gap-3">
            {showUserName && (
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{displayName}</span>
              </div>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation - hide on /chat */}
      {!hideNavigation && location.pathname !== '/chat' && <DesignBBottomTabs />}

      {/* Voice Assistant - only show on routes with navigation, but not on /chat */}
      {!hideNavigation && <AssistantWidget />}

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()}. Built with <Heart className="inline h-4 w-4 text-destructive fill-destructive" /> using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
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
