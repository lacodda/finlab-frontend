import { Route, Routes } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';

export function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
