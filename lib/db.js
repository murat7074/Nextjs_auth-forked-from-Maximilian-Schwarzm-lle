import {MongoClient } from "mongodb"

//NOTE: use your mongodb account

export async function connectToDatabase() {
  const client = await MongoClient.connect(
      " mongodb+srv://username:<password>@<>x2uy4.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
