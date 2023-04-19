import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from 'react';
import cn from 'classnames';
import { ModeSwitch } from '@finlab-frontend/ui';
import { BeakerIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  color?: 'transparent' | 'default';
}

export const Navbar = ({ color = 'default', children, className, ...props }: NavbarProps): JSX.Element => {
  return (
    <nav className={cn('top-0 sticky z-50 w-full flex items-center px-5 py-3 navbar-expand-lg', {
      'bg-white shadow': color === 'default'
    })}>
      <Link to='/' className='flex gap-1 items-center'>
        <BeakerIcon className="h-5 w-5 text-cyan-900 inline-block"/>
        finlab
      </Link>
      <div className="px-2 flex flex-wrap w-full items-center justify-between">
        {children}
      </div>
      <ModeSwitch className='ml-2 justify-self-end' />
    </nav>
  );
};
