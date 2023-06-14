import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { app } from "./config";

export type User = {
  groupNumber: number;
  passport: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isMale: boolean;
  phoneNumber: string;
  digitalIdentityURL: string;
};

export const getUserByPassport = async (passport: string) => {
  const db = getFirestore(app);
  const col = collection(db, "Users");
  const searchQuery = query(col, where("passport", "==", passport));
  const docsRef = await getDocs(searchQuery);
  if (docsRef.size === 0) {
    console.log(`getGroup: User with passport ${passport} not found!`);
    return null;
  }

  const data = (await docsRef.docs[0].data()) as User;
  return data;
};

export const addUser = async (user: User) => {
  try {
    const db = getFirestore(app);
    const col = collection(db, "Users");
    await addDoc(col, user);
    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUsersByGroupNumber = async (groupNumber: number) => {
  const db = getFirestore(app);
  const col = collection(db, "Users");
  const searchQuery = query(col, where("groupNumber", "==", groupNumber));
  const docsRef = await getDocs(searchQuery);
  if (docsRef.size === 0) {
    console.log(
      `getUsersByGroupNumber: No users found with group number ${groupNumber}`
    );
    return [];
  }

  const users: User[] = [];
  docsRef.forEach((doc) => {
    const data = doc.data() as User;
    users.push(data);
  });

  return users;
};
