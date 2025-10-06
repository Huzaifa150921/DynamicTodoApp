import Login from '@/app/components/auth/login/Login';
import { auth } from '@/app/lib/Auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return <Login />;
};

export default LoginPage;
