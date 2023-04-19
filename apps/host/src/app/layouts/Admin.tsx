
import { type FunctionComponent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@finlab-frontend/hooks';
import { Button } from '@finlab-frontend/ui';
import { Footer, Navbar } from '../components';

export interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const { user, signOut } = useAuth();
  return (
    <>
      <Navbar>
        { user?.email
          ? (<>
          <Link className='ml-auto' to='/work-time'>Work time</Link>
          <Link className='ml-4' to='/user'>{user?.displayName ?? user.email}</Link>
          <Button className='ml-4' onClick={signOut}>Sign Out</Button>
          </>)
          : <Link className='ml-auto' to='/auth/signin'><Button>Sign In</Button></Link>
        }
      </Navbar>
      <section className='grid grid-rows-Admin-layout min-h-screen gap-4'>
        <div className='p-4'>
          {children}
        </div>
        <Footer />
      </section>
    </>
  );
};

export const withAdminLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AdminLayout>
        <Component {...props} />
      </AdminLayout>
    );
  };
};
