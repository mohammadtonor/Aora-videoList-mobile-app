import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.creator.aroa",
  projectId: "66c4e0b4001cc7798fcf",
  databaseId: "66c4eda5002572235410",
  userCollectionId: "66c4ee0400101b8d8cdc",
  videoCollectionId: "66c4ee370009d5c69100",
  storageId: "66c4f0a4000cb12c84a7",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
        console.log("============createUser==================");
        console.log(error);
    }
  }

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
}

// Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
      
      const currentUser = await databases.listDocuments(
          config.databaseId,
          config.userCollectionId,
          [Query.equal("accountId", currentAccount.$id)]
        );
        console.log(currentUser);
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }