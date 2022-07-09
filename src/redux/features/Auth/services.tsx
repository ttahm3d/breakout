import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../../configs/firebase";
import { Toast } from "../../../components";
import { db } from "../../../configs/firebase";
import { IAuth, SignUpType, UserType, SignInType } from "../../../types";

export const createUser = async (signupData: SignUpType, userId: string) => {
  try {
    const user: UserType = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      userName:
        signupData.firstName.toLocaleLowerCase() +
        signupData.lastName.toLocaleLowerCase() +
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

export const googleSignIn = async () => {
  try {
    const response = await signInWithPopup(auth, googleAuthProvider);
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    Toast({ message: "Sign in Successful", type: "success" });
    return await getUserById(response?.user?.uid);
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
    return undefined;
  }
};

export const googleSignUp = async () => {
  try {
    const response = await signInWithPopup(auth, googleAuthProvider);
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    const createdGoogleUser = await createGoogleUser(response?.user);
    Toast({ message: "Google Signup Successful", type: "success" });
    return createdGoogleUser;
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const emailPasswordSignUp = async (signupData: SignUpType) => {
  try {
    const { email, password } = signupData;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    const createdUser = await createUser(signupData, response?.user?.uid);
    Toast({ message: "Account creation successful", type: "success" });
    return createdUser;
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const emailPasswordSignIn = async (signinData: SignInType) => {
  try {
    const { email, password } = signinData;
    const response = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("breakout/user-id", response?.user?.uid);
    Toast({ message: "Sign In Successful", type: "success" });
    return await getUserById(response?.user?.uid);
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};

export const userLogout = async () => {
  try {
    localStorage.removeItem("breakout/user-id");
    await signOut(auth);
    Toast({ message: "Sign out Successful", type: "success" });
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
};
