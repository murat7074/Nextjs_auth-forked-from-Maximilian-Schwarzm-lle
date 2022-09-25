// /api/user/change-password

import { getSession } from 'next-auth/client';
import { verifyPassword, hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }
  // eğer "PATCH" var ise
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' }); // 401  authentication yok demek
    return;
  }
  // [...nextauth].js den return { email: user.email }; bilgisini kullanacağız
  const userEmail = session.user.email; // şu an login olan user
  const oldPassword = req.body.oldPassword; // eski şifresini 
  const newPassword = req.body.newPassword; // kullanıcının değiştirdiği şifre

  // mongodb ye bağlanıcaz
  const client = await connectToDatabase();
  const userCollection = client.db().collection('users');
  const user = await userCollection.findOne({ email: userEmail });

 

  if (!user) {
    res.status(404).json({ message: 'user not found' });
    client.close();
    return;
  }
  // "user.password" user ın mongodb deki hashed password u
  const currentPassword = user.password;



  // hash yaparak mongodb ye kaydettiğimiz password u çağırırken lib klasöründeki "verifyPassword" kullanarak  kıyaslamalıyız
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  
  if (!passwordsAreEqual) {  // eşit değilse
    res.status(403).json({ message: 'Invalid password' });
    client.close();
    return;
  }
  // oldPassword ve currentPassword eşitse
  const hashedPassword = await hashPassword(newPassword); // yeni şifreyi hash leyelim

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } } /* "$set:" kodu mongodb özelliğidir*/
  );

  client.close()
  res.status(200).json({message:"Password updated"})
}



export default handler;
