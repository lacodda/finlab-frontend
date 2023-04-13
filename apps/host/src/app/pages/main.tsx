import { withAdminLayout } from '../layouts';

export function Main({ title }: { title: string }): JSX.Element {
  return (
    <div>
        Hello
    </div>
  );
}

export const MainPage = withAdminLayout(Main);
