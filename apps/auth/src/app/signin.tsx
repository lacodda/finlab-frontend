import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Input } from '@finlab-frontend/ui';
import { useAuth } from '@finlab-frontend/hooks';

function SignIn(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signInError, signIn } = useAuth();
  const SignIn = (): void => {
    signIn({ email, password });
  };
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      SignIn();
    }
  };
  return (
    <div className='container mx-auto flex flex-col px-4 justify-center items-center'>
        <div className='relative flex flex-col min-w-0 break-words w-full sm:w-3/4 md:w-2/3 lg:w-1/3 mb-5 shadow-lg rounded-lg bg-sky-50 border border-cyan-600 dark:bg-slate-800'>
          <div className='mb-0 p-6'>
            <div className='text-center mb-3 text-cyan-600 text-sm font-bold'>Sign in with credentials</div>
            <hr className='mt-6 border-b-1 border-cyan-600' />
          </div>
          <div className='flex-auto px-6 lg:px-8 py-8 pt-0'>
            <div className='text-red-500 font-bold'>{signInError?.message}</div>
            <form>
              <Input type='email' placeholder='Email' label='Email' value={email} onChange={(e) => { setEmail(e.target.value); }} onKeyDown={handleKeyDown} />
              <Input type='password' placeholder='Password' label='Password' value={password} onChange={(e) => { setPassword(e.target.value); }} onKeyDown={handleKeyDown} />
              <Checkbox label='Remember me' />
              <Button className='mt-6 w-full justify-center font-bold uppercase' onClick={SignIn}>Sign In</Button>
            </form>
          </div>
        </div>
        <Link to='/auth/signup' className='text-sm text-cyan-400 hover:text-cyan-600'>Create new account</Link>
      </div>
  );
}

export default SignIn;
