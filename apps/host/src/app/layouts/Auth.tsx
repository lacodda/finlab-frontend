
import { type ReactNode } from 'react';
import { Footer, Navbar } from '../components';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar color='transparent'/>
      <section className="grid grid-rows-auth-layout min-h-screen gap-4 pt-20">
        {children}
        <Footer />
      </section>
    </>
  );
};
