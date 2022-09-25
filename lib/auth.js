
import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// hash yaparak mongodb ye kaydettiğimiz password u çağırırken compare ile ilk haline çevirip kıyaslamalıyız
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
