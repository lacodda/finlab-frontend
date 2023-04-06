import * as React from "react";

import NxWelcome from "./nx-welcome";

import { Link, Route, Routes } from "react-router-dom";

const Auth = React.lazy(() => import("auth/Module"));

const WorkTime = React.lazy(() => import("work-time/Module"));

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
