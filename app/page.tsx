
import Login from './components/auth/login/Login';
import { auth } from '@/app/lib/Auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/components/dashboard');
  }

  return <Login />;
};

export default Page;
