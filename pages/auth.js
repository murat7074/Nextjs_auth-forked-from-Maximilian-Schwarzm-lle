import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

function AuthPage() {
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();

  // user login ise home page e gitsin
  // elle url ye "auth" da yazsak home page e gidecek
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        // user login değilse
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
