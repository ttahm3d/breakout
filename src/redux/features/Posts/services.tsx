import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../../configs/firebase";
import { PostType } from "../../../types";
import { getUserById } from "../Auth/services";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const getAllPostsHandler = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const postsDocs = await getDocs(q);
    const posts = postsDocs.docs.map((p) => ({ ...p.data() }));
    return posts;
  } catch (error) {
    toast.error("Unable to fetch posts. Try later");
  }
};

export const getPostsByUsernameHandler = async (userName: string) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("userName", "==", userName),
      orderBy("timeStamp", "desc")
    );
    const postsDocs = await getDocs(q);
    const posts = postsDocs.docs.map((p) => ({ ...p.data() }));
    return posts;
  } catch (error) {
    console.error(error);
  }
};

// TODO: Dont see the requirement now to work on this
export const getPostsByIdHandler = async () => {};

export const getPostsOfFollowingHandler = async () => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const user = await getUserById(uid);
      const followingIds = user?.following?.reduce(
        (acc: string[], cur: any) => {
          return [...acc, cur?.uid];
        },
        []
      );
      const q = query(
        collection(db, "posts"),
        where("userId", "in", [...followingIds, uid]),
        orderBy("timeStamp", "desc")
      );
      const postsDocs = await getDocs(q);
      const posts = postsDocs.docs.map((p) => ({ ...p.data() }));
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPostHandler = async (postData: PostType) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const user = await getUserById(uid);
      const post: PostType = {
        comments: [],
        content: postData?.content,
        imageURL: postData?.imageURL,
        imgAltText: postData?.imgAltText,
        fullName: `${user?.firstName} ${user?.lastName}`,
        likes: [],
        timeStamp: serverTimestamp(),
        userId: user?.uid,
        userImgURL: user?.photoURL,
        userName: user?.userName,
      };
      const postDoc = await addDoc(collection(db, "posts"), post);
      const postRef = doc(db, "posts", postDoc.id);
      await updateDoc(postRef, { pid: postDoc?.id });
      return await getAllPostsHandler();
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadPostPhoto = async (file: any) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const loading = toast.loading("Uploading image...");
      const storageRef = ref(storage, `/posts/${file?.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const pathName = uploadTask?.ref?.toString();
      const uploadedPostPic = ref(storage, pathName);
      toast.success("Image added successfully", { id: loading });
      const url = await getDownloadURL(uploadedPostPic);
      return url;
    }
  } catch (error) {
    console.log(error);
  }
};
