import { WorkTime } from './components/WorkTime';
import { CreateTimestamp } from './components/CreateTimestamp';
import { useState } from 'react';
import { type Timestamp } from './entities';

export function App(): JSX.Element {
  const [timestamp, setTimestamp] = useState<Timestamp>();
  return (
    <>
      <WorkTime timestamp={timestamp} setTimestamp={setTimestamp} />
      <CreateTimestamp value={timestamp} />
    </>
  );
}

export default App;
