
import Login from './components/auth/login/Login';
import { auth } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/components/dashboard');
  }

  return <Login />;
};

export default Page;
