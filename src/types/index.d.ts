import * as FirebaseAuth from "firebase/auth";

export interface IAuth extends FirebaseAuth.User {}

export type UserType = {
  userName: string;
  password: "";
  photoURL: string;
  followers: [User];
  following: [User];
  bio: string;
  website: string;
};
