import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { IAuth, SignUpType, UserType } from "../../types";

export const createUser = async (signupData: SignUpType, userId: string) => {
  try {
    const user: UserType = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      userName:
        signupData.firstName +
        signupData.lastName +
        Math.floor(Math.random() * 1000) +
        9000,
      email: signupData.email,
      photoURL:
        "https://res.cloudinary.com/dut75albw/image/upload/v1656740158/breakout/user_czi25a.png",
      followers: [],
      following: [],
      bio: "",
      website: "",
    };
    await setDoc(doc(db, "users", userId), user);
    const userInfo = getUserById(userId);
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error: any) {
    return error;
  }
};

export const createGoogleUser = async (gUser: IAuth) => {
  try {
    if (gUser?.displayName) {
      const user: UserType = {
        firstName: gUser?.displayName?.split(" ")[0],
        lastName: gUser?.displayName?.split(" ")[1],
        userName:
          gUser?.displayName?.split(" ")[0].toLocaleLowerCase() +
          gUser?.displayName?.split(" ")[1].toLocaleLowerCase() +
          Math.floor(Math.random() * 1000),
        email: gUser?.email,
        photoURL: gUser.photoURL,
        followers: [],
        following: [],
        bio: "",
        website: "",
      };
      await setDoc(doc(db, "users", gUser.uid), user);
      const userInfo = getUserById(gUser.uid);
      return userInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = createAsyncThunk(
  "user/user-info",
  async (userId: string) => {
    try {
      return await getUserById(userId);
    } catch (error) {
      console.log(error);
    }
  }
);
