import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
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

export const getPostsByIdHandler = async (postId: string) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error: any) {
    return error;
  }
};

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

export const editPostHandler = async (args: any) => {
  try {
    const { postId, postData } = args;
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      // const postRef = doc(db, "posts", postId);
    }
  } catch (error: any) {
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
      const posts = await getAllPostsHandler();
      const timelinePosts = await getPostsOfFollowingHandler();
      const postsOfCurrentUser = await getPostsByUsernameHandler(
        user?.userName
      );
      return {
        posts,
        timelinePosts,
        postsOfCurrentUser,
      };
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

export const likePostHandler = async (postId: string) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userData = await getUserById(uid);
      const postData = await getPostsByIdHandler(postId);
      const userRef = doc(db, "users", uid);
      const postRef = doc(db, "posts", postId);
      await updateDoc(userRef, {
        likes: arrayUnion({
          ...postData,
        }),
      });
      await updateDoc(postRef, {
        likes: arrayUnion({
          uid,
          userName: userData?.userName,
          fullName: `${userData?.firstName} ${userData?.lastName}`,
        }),
      });
      const posts = await getAllPostsHandler();
      const timelinePosts = await getPostsOfFollowingHandler();
      const postsOfCurrentUser = await getPostsByUsernameHandler(
        userData?.userName
      );
      return {
        posts,
        timelinePosts,
        postsOfCurrentUser,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const unlikePostHandler = async (postId: string) => {
  try {
    const uid = localStorage.getItem("breakout/user-id");
    if (uid) {
      const userData = await getUserById(uid);
      const postData = await getPostsByIdHandler(postId);
      const userRef = doc(db, "users", uid);
      const postRef = doc(db, "posts", postId);
      await updateDoc(userRef, {
        likes: arrayRemove({
          ...postData,
        }),
      });
      await updateDoc(postRef, {
        likes: arrayRemove({
          uid,
          userName: userData?.userName,
          fullName: `${userData?.firstName} ${userData?.lastName}`,
        }),
      });
      const posts = await getAllPostsHandler();
      const timelinePosts = await getPostsOfFollowingHandler();
      const postsOfCurrentUser = await getPostsByUsernameHandler(
        userData?.userName
      );
      return {
        posts,
        timelinePosts,
        postsOfCurrentUser,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
