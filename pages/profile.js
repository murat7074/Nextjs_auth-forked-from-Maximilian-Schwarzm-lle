import UserProfile from '../components/profile/user-profile';
import {getSession } from 'next-auth/client'; // hem client hemde server side da kullanabiliriz

function ProfilePage() {
  return <UserProfile />;
}


// adding server side page guard
export async function getServerSideProps(context){
 const session = await getSession({req:context.req})
if(!session) { // user authendicate değilse
  return {
     redirect:{
        destination:"/auth",
        permanent:false
    }
  }
}
// user authendicate ok.
return {
  props:{session},
}
}

export default ProfilePage;
