import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { loadRemoteModule } from '@finlab-frontend/load-remote-module';
import NxWelcome from './nx-welcome';

const Auth = React.lazy(async () => await loadRemoteModule('auth', './Module'));
const WorkTime = React.lazy(async () => await loadRemoteModule('work-time', './Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/auth">Auth</Link>
        </li>

        <li>
          <Link to="/work-time">WorkTime</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/work-time" element={<WorkTime />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
