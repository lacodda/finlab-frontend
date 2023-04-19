
import { type DetailedHTMLProps, type HTMLAttributes, useEffect, useState, type Dispatch } from 'react';
import cn from 'classnames';
import { Button, LoadingBar } from '@finlab-frontend/ui';
import { type Timestamp, Timestamps } from '../entities';

export interface WorkTimeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  timestamp?: Timestamp;
  setTimestamp: Dispatch<Timestamp>;
}

export const WorkTime = ({ className, timestamp, setTimestamp, ...props }: WorkTimeProps): JSX.Element => {
  const [timestampList, setTimestampList] = useState<Timestamp[]>([]);
  const [timestampError, setTimestampError] = useState<Error>();
  const [timestampLoading, setTimestampLoading] = useState<boolean>();
  const timestamps = new Timestamps();

  async function getTimestamps(): Promise<void> {
    setTimestampLoading(true);
    await timestamps.fetch({ raw: true });
    setTimestampList(timestamps.timestampList);
    setTimestampError(timestamps.error);
    setTimestampLoading(false);
  }

  useEffect(() => {
    void getTimestamps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      {timestampError && <p>There is an error!</p>}
      {timestampLoading && <LoadingBar />}
      <Button className='w-full mb-4 justify-center font-bold uppercase' onClick={() => { void getTimestamps(); }}>Update</Button>
      <div className='grid grid-cols-3 justify-center items-center gap-4'>
        {timestampList.map((item, k) => <div key={k} className='contents cursor-pointer' onClick={() => { setTimestamp(item); }}>
          <div>{item.timestamp.toISOString()}</div>
          <div>{item.type}</div>
          <Button className='w-full justify-center font-bold uppercase' onClick={() => { void item.delete(); }}>Delete</Button>
        </div>)}
      </div>
    </div>
  );
};
