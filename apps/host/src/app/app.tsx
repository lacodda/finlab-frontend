import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';
import { useAuth, ProvideAuth } from '@finlab-frontend/hooks';
import wrapComponent from './ModuleFederationWrapper/wrapComponent';
import { AuthLayout, AdminLayout } from './layouts';
import { LoadingBar } from '@finlab-frontend/ui';

// wrapComponent is an HOC with an ErrorBoundary & React.Suspense to lazy load the module/MicroFrontend
const AuthApp = wrapComponent(lazy(async () => await import('auth/Module')));
const WorkTimeApp = wrapComponent(lazy(async () => await import('work-time/Module')));

export function App(): JSX.Element {
  const auth = useAuth();
  return (
    <ProvideAuth {...auth}>
    <Suspense fallback={<LoadingBar />}>
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
            path="/work-time/*"
            element={
              <AdminLayout>
                <WorkTimeApp
                  delayed={<LoadingBar />}
                  error={<div>Error work-time remote</div>}
                  />
              </AdminLayout>
            }
          />
        </Routes>
      </main>
    </Suspense>
    </ProvideAuth>
  );
}

export default App;
