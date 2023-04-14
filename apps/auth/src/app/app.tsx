import { useAuth, ProvideAuth } from '@finlab-frontend/hooks';
import { Route, Routes } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';

export function App(): JSX.Element {
  const auth = useAuth();
  return (
    <ProvideAuth {...auth}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ProvideAuth>
  );
}

export default App;
