// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

export function App(): JSX.Element {
  return (
    <>
      <NxWelcome title="auth" />

      <div />
    </>
  );
}

export default App;
