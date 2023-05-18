import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

import { db } from "../utils/firebase";

export const createUser = async (id, values) => {
  try {
    const request = await setDoc(doc(db, "users", id), values);

    return request;
  } catch (error) {
    console.error(error);
  }
};
