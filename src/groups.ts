import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app } from "./config";

type Activity = {
  name: string;
  time: Timestamp;
};
type Meal = {
  name: string;
  time: string;
};

type Group = {
  groupNumber: number;
  groupName: string;
  hotelName: string;
  activities: Array<Activity>;
  meals: Array<Meal>;
};

export const getGroupByNumber = async (groupNumber: number) => {
  const store = getFirestore(app);
  const col = collection(store, "Groups");
  const searchQuery = query(col, where("groupNumber", "==", groupNumber));
  const docsRef = await getDocs(searchQuery);
  if (docsRef.size === 0) {
    console.error(`getGroup: Group ${groupNumber} not found!`);
    return null;
  }

  const data = (await docsRef.docs[0].data()) as Group;
  return data;
};

export const changeMealTimes = async (
  groupNumber: number,
  newMealTimes: Array<Meal>
) => {
  const store = getFirestore(app);
  const groupDocRef = doc(store, "Groups", `${groupNumber}`);
  try {
    await updateDoc(groupDocRef, {
      meals: newMealTimes,
    });
    console.log(`Meal times updated for group ${groupNumber}`);
  } catch (error) {
    console.error("Error updating meal times:", error);
  }
};

export const changeActivityDetails = async (
  groupNumber: number,
  newActivities: Array<Activity>
) => {
  const store = getFirestore(app);
  const groupDocRef = doc(store, "Groups", `${groupNumber}`);
  try {
    await updateDoc(groupDocRef, {
      activities: newActivities,
    });
    console.log(`Activity details updated for group ${groupNumber}`);
  } catch (error) {
    console.error("Error updating activity details:", error);
  }
};
