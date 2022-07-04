import * as FirebaseAuth from "firebase/auth";

export interface IAuth extends FirebaseAuth.User {}

export type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type UserType = {
  firstName: string | any;
  lastName: string | any;
  email: string | any;
  photoURL: string | any;
  followers: [User] | [];
  following: [User] | [];
  bio: string;
  website: string;
};
