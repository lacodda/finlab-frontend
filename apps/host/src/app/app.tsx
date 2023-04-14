import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';
import { useAuth, ProvideAuth } from '@finlab-frontend/hooks';
import wrapComponent from './ModuleFederationWrapper/wrapComponent';
import { AuthLayout } from './layouts';
import { LoadingBar } from '@finlab-frontend/ui';

// wrapComponent is an HOC with an ErrorBoundary & React.Suspense to lazy load the module/MicroFrontend
const AuthApp = wrapComponent(React.lazy(async () => await import('auth/Module')));
const WorkTimeApp = wrapComponent(React.lazy(async () => await import('work-time/Module')));

export function App(): JSX.Element {
  const auth = useAuth();
  return (
    <ProvideAuth {...auth}>
    <React.Suspense fallback="Loading">
      <main className="app bg-gradient-to-bl from-teal-300 to-blue-900 dark:from-teal-700 dark:to-indigo-900">
        <Routes>
          <Route path="/" element={<MainPage title="host" />} />
          <Route
            path="/auth/*"
            element={
              <AuthLayout>
                <AuthApp
                  delayed={<LoadingBar />}
                  error={<div>Error auth remote</div>}
                />
              </AuthLayout>
            }
          />
          <Route
            path="/work-time"
            element={
              <WorkTimeApp
                delayed={<LoadingBar />}
                error={<div>Error work-time remote</div>}
              />
            }
          />
        </Routes>
      </main>
    </React.Suspense>
    </ProvideAuth>
  );
}

export default App;
