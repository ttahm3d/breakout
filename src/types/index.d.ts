import * as FirebaseAuth from "firebase/auth";

export interface IAuth extends FirebaseAuth.User {}

export type SignUpType = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type UserType = {
  userName: string | null;
  email: string | null;
  photoURL: string | null;
  followers: [User] | [];
  following: [User] | [];
  bio: string;
  website: string;
};
