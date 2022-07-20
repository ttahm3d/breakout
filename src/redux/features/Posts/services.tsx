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
    const userDocs = await getDocs(q);
    const posts = userDocs.docs.map((p) => ({ ...p.data() }));
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
    const userDocs = await getDocs(q);
    const posts = userDocs.docs.map((p) => ({ ...p.data() }));
    return posts;
  } catch (error) {
    toast.error("Unable to fetch posts. Try later");
  }
};

export const getPostsByIdHandler = async () => {};

export const getPostsOfFollowingHandler = async () => {};

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
