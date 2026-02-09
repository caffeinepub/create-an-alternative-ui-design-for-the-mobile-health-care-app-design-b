import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { DesignBProvider } from './designB/themeContext';
import { DesignBAppShell } from './designB/layout/DesignBAppShell';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomeDashboard from './pages/HomeDashboard';
import Profile from './pages/Profile';

const rootRoute = createRootRoute({
  component: () => <DesignBAppShell />,
});

const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Welcome,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignUp,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomeDashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  welcomeRoute,
  signInRoute,
  signUpRoute,
  homeRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DesignBProvider>
        <RouterProvider router={router} />
        <Toaster />
      </DesignBProvider>
    </ThemeProvider>
  );
}
