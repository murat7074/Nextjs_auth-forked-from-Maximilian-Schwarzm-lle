import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// import { useSession, getSession } from 'next-auth/client';
// import { useEffect, useState } from 'react';

  // pages/profile de "getServerSideProps" kullanınca aşağıdaki kodlara gerek kalmadı
  // artık hem client hemde server side tarafında "profile" page login olmayanlar için korundu

function UserProfile() {
   // const [isLoading, setIsLoading] = useState(true);
  // Client side Route Protection ("profile" sayfası için)
  // useEffect(() => {
  //   getSession().then((session) => {
  //       if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }    });  }, []);
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData){  // "passwordData" içinde eski ve yeni password var
 const response =  await fetch("/api/user/change-password",{
      method:"PATCH",
      body:JSON.stringify(passwordData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
      console.log(data)
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
