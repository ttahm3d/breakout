import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiOutlineTag } from "react-icons/ai";
import {
  MdOutlineComment,
  MdOutlineBookmarkAdd,
  MdBookmark,
} from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FlexCenter } from "../../styles/globals";
import { IconType } from "react-icons/lib";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addBookmark,
  likePost,
  removeBookmark,
  unLikePost,
} from "../../redux/features/Posts/thunk";
import { useState } from "react";
import LikesDialog from "./LikesDialog";

type PostCardProps = {
  post: DocumentData;
};

type ActionType = {
  id: string;
  icon: IconType;
  actionHandler: any;
  text: string;
};

const getProfileUser = (users: DocumentData[] | undefined, userId: string) =>
  users?.find((user) => user?.uid === userId);

const checkIfPostIsLiked = (post: DocumentData | undefined, uid: string) =>
  post?.likes.some((p: any) => p?.uid === uid);

const checkIfPostIsBookmarked = (post: DocumentData | undefined, uid: string) =>
  post?.bookmarks?.some((p: any) => p?.uid === uid);

const checkIfUserAllowedToEditDelete = (postUserId: string, uid: string) =>
  postUserId === uid;

export default function PostCard({ post }: PostCardProps): JSX.Element {
  const [showLikesDialog, setShowLikesDialog] = useState<boolean>(false);

  const openLikesDialog = () => setShowLikesDialog(true);
  const closeLikesDialog = () => setShowLikesDialog(false);

  const dispatch = useAppDispatch();
  const { otherUsers: users } = useAppSelector((s) => s.userReducer);
  const { currentUser: user } = useAppSelector((s) => s.authReducer);

  const postUser = getProfileUser(users, post?.userId);
  const isLiked = checkIfPostIsLiked(post, user?.uid);
  const isBookmarked = checkIfPostIsBookmarked(post, user?.uid);
  const isAllowedToEditDelete = checkIfUserAllowedToEditDelete(
    post?.userId,
    user?.uid
  );

  const actions: ActionType[] = [
    {
      id: "comment",
      icon: MdOutlineComment,
      actionHandler: () => console.log("comment"),
      text: "Comment",
    },
    {
      id: "bookmark",
      icon: isBookmarked ? MdBookmark : MdOutlineBookmarkAdd,
      actionHandler: isBookmarked
        ? () => dispatch(removeBookmark(post?.pid))
        : () => dispatch(addBookmark(post?.pid)),
      text: isBookmarked ? "Bookmarked" : "Bookmark",
    },
    {
      id: "like",
      icon: isLiked ? AiFillHeart : AiOutlineHeart,
      actionHandler: isLiked
        ? () => dispatch(unLikePost(post?.pid))
        : () => dispatch(likePost(post?.pid)),
      text: isLiked ? "Liked" : "Like",
    },
  ];

  return (
    <PostContainer>
      <PostHeader>
        <PostProfileImage>
          <img
            src={postUser?.photoURL || user?.photoURL}
            alt={`${post?.userName}'s profile`}
          />
        </PostProfileImage>
        <PostUserInfo>
          <PostFullName>{post?.fullName}</PostFullName>
          <PostUserName>&#64;{post?.userName}</PostUserName>
        </PostUserInfo>
        {isAllowedToEditDelete && (
          <PostOptions>
            <FlexCenter>
              <IoEllipsisVertical />
            </FlexCenter>
          </PostOptions>
        )}
      </PostHeader>
      <PostBody>
        <PostContent>{post?.content}</PostContent>
        {post?.imageURL && (
          <PostImageContainer>
            <img src={post?.imageURL} alt={post?.imgAltText} />
            {post?.imgAltText && (
              <PostImageAltText>
                <small>
                  <FlexCenter>
                    <AiOutlineTag />
                  </FlexCenter>
                  &nbsp;Image ALT text: {post?.imgAltText}
                </small>
              </PostImageAltText>
            )}
          </PostImageContainer>
        )}
      </PostBody>
      <PostStats onClick={openLikesDialog}>
        {isLiked
          ? post?.likes?.length > 1
            ? `You and ${post?.likes?.length - 1} others liked this`
            : "You liked this"
          : post?.likes?.length > 1
          ? `${post?.likes[0]?.firstName} & ${
              post?.likes?.length - 1
            } other liked this`
          : post?.likes?.length
          ? `${post?.likes[0]?.firstName} liked this`
          : "Be the first one to like this"}
      </PostStats>
      <PostActions>
        {actions.map((action) => (
          <Action key={action.id} onClick={action.actionHandler}>
            <FlexCenter className="icon">{<action.icon />}</FlexCenter>
            <div>{action.text}</div>
          </Action>
        ))}
      </PostActions>
      <LikesDialog
        showLikesDialog={showLikesDialog}
        closeLikesDialog={closeLikesDialog}
        likes={post?.likes}
      />
    </PostContainer>
  );
}

const PostContainer = styled.article`
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.violet6};

  :hover {
    background-color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet2;
      }
      return props.theme.colors.violet2;
    }};
    opacity: ${(props) => {
      if (props.theme.title === "dark") {
        return 1;
      }
      return 1;
    }};
  }

  :last-child {
    border: none;
  }
`;

const PostHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
`;

const PostProfileImage = styled.div`
  align-self: center;
  justify-self: center;
  position: relative;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    aspect-ratio: 1;
    border: 2px solid ${(props) => props.theme.colors.slate1};
  }
`;

const PostUserInfo = styled.div`
  justify-self: start;
  align-self: center;
`;

const PostFullName = styled.div`
  font-size: clamp(1rem, 10vw, 1.2rem);
  font-weight: 600;
  margin: 0;
`;

const PostUserName = styled.div`
  color: ${(props) => props.theme.colors.mauve10};
`;

const PostOptions = styled.div`
  font-size: 1.25rem;
  align-self: center;
  justify-self: flex-end;
`;

const PostBody = styled.div`
  padding: 1rem 0.5rem;
`;

const PostContent = styled.div`
  padding-bottom: 1rem;
`;

const PostImageContainer = styled.div`
  padding: 0.5rem 0 0;
  position: relative;

  img {
    object-fit: cover;
  }
`;

const PostImageAltText = styled.div`
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.colors.violet3};
  color: ${(props) => props.theme.colors.violet9};
  border: 1px solid ${(props) => props.theme.colors.violet7};
  padding: 0.25rem;
  width: fit-content;

  small {
    display: flex;
  }
`;

const PostStats = styled.div`
  display: flex;
  font-size: smaller;
  padding: 0.5rem;
  border-top: 0.5px solid ${(props) => props.theme.colors.violet4};
  border-bottom: 0.5px solid ${(props) => props.theme.colors.violet4};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const PostActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Action = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0.5rem 0;
  font-size: smaller;
  gap: 1rem;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.theme.title === "dark") {
      return props.theme.colors.violet2;
    }
    return props.theme.colors.violet3;
  }};
  border-bottom: 0.5px solid ${(props) => props.theme.colors.violet4};
  color: ${(props) => {
    if (props.theme.title === "dark") {
      return props.theme.colors.violet9;
    }
    return props.theme.colors.violet9;
  }};

  .icon {
    font-size: 1rem;
  }

  :hover {
    background-color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet3;
      }
      return props.theme.colors.violet4;
    }};
    color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet10;
      }
      return props.theme.colors.violet10;
    }};
  }

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet6};
    outline-offset: 1px;
  }

  :active {
    background-color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet5;
      }
      return props.theme.colors.violet5;
    }};
  }
`;
