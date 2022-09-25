import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession, getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

// Client side Route Protection ("profile" sayfası için)

function UserProfile() {
  // Redirect away if NOT auth
  //  const [session, loading] = useSession();  // devamlı loading oluyor
  const [isLoading, setIsLoading] = useState(true);
  
  // sistem devamlı loading olmasın diye "getSession" kullanıyoruz
  useEffect(() => {
    getSession().then((session) => {
      // kullanıcı login değilse "profile" sayfasına gidemeyecek. bunun yerine "auth" sayfasına yönlendirilecek
      // "profile"  elle de yazılsa login olmayan erişemez
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
