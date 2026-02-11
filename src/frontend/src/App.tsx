import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { ThemeProvider } from 'next-themes';
import { DesignBProvider } from './designB/themeContext';
import { DesignBAppShell } from './designB/layout/DesignBAppShell';
import { Toaster } from './components/ui/sonner';

// Pages
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomeDashboard from './pages/HomeDashboard';
import Profile from './pages/Profile';
import Chatbot from './pages/Chatbot';
import Report from './pages/Report';
import NotFoundRedirect from './pages/NotFoundRedirect';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Create root route with layout
const rootRoute = createRootRoute({
  component: DesignBAppShell,
});

// Create routes
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

const chatbotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: Chatbot,
});

const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/report',
  component: Report,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundRedirect,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  welcomeRoute,
  signInRoute,
  signUpRoute,
  homeRoute,
  profileRoute,
  chatbotRoute,
  reportRoute,
  notFoundRoute,
]);

// Create the router
const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DesignBProvider>
          <QueryClientProvider client={queryClient}>
            <InternetIdentityProvider>
              <RouterProvider router={router} />
              <Toaster />
            </InternetIdentityProvider>
          </QueryClientProvider>
        </DesignBProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
