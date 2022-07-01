import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleAuthProvider, db, app } from "../../configs/firebase";
import { IAuth, SignUpType, UserType } from "../../types";

export const createUser = async (signupData: SignUpType, userId: string) => {
  try {
    const user: UserType = {
      userName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
      photoURL: "",
      followers: [],
      following: [],
      bio: "",
      website: "",
    };
    await setDoc(doc(db, "users", userId), user);
    const userInfo = getUser(userId);
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {}
};

export const createGoogleUser = async (gUser: IAuth) => {
  try {
    const user: UserType = {
      userName: gUser?.displayName,
      email: gUser?.email,
      photoURL: gUser.photoURL,
      followers: [],
      following: [],
      bio: "",
      website: "",
    };
    await setDoc(doc(db, "users", gUser.uid), user);
    const userInfo = getUser(gUser.uid);
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};
