import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { AiOutlineLike, AiOutlineTag } from "react-icons/ai";
import { MdOutlineComment, MdOutlineBookmarkAdd } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FlexCenter } from "../../styles/globals";
import { IconType } from "react-icons/lib";
import { useAppSelector } from "../../hooks";

type PostCardProps = {
  post: DocumentData;
};

type ActionType = {
  id: string;
  icon: IconType;
  actionHandler: (x: any) => any;
  text: string;
};

const getProfileUser = (users: DocumentData[] | undefined, userId: string) =>
  users?.find((user) => user?.uid === userId);

export default function PostCard({ post }: PostCardProps): JSX.Element {
  const { otherUsers: users } = useAppSelector((s) => s.userReducer);
  const { currentUser: user } = useAppSelector((s) => s.authReducer);
  const postUser = getProfileUser(users, post?.userId);
  const actions: ActionType[] = [
    {
      id: "like",
      icon: AiOutlineLike,
      actionHandler: () => console.log("like"),
      text: "Like",
    },
    {
      id: "comment",
      icon: MdOutlineComment,
      actionHandler: () => console.log("comment"),
      text: "Comment",
    },
    {
      id: "bookmark",
      icon: MdOutlineBookmarkAdd,
      actionHandler: () => console.log("bookmark"),
      text: "Bookmark",
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
        <PostOptions>
          <FlexCenter>
            <IoEllipsisVertical />
          </FlexCenter>
        </PostOptions>
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
      <PostStats>
        {post?.likes.length === 0 ? (
          <small>Be the first one to like</small>
        ) : (
          <small>Liked by {post?.likes?.length} people</small>
        )}
      </PostStats>
      <PostActions>
        {actions.map((action) => (
          <Action key={action.id} onClick={action.actionHandler}>
            <FlexCenter className="icon">{<action.icon />}</FlexCenter>
            <div>{action.text}</div>
          </Action>
        ))}
      </PostActions>
    </PostContainer>
  );
}

const PostContainer = styled.article`
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.violet8};

  :hover {
    background-color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet2;
      }
      return props.theme.colors.violet2;
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
    border: 2px solid ${(props) => props.theme.colors.slate1};
  }
`;

const PostUserInfo = styled.div`
  justify-self: start;
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
  padding: 0.5rem;
  border-top: 0.5px solid ${(props) => props.theme.colors.violet4};
  border-bottom: 0.5px solid ${(props) => props.theme.colors.violet4};
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
  border-bottom: 0.5px solid ${(props) => props.theme.colors.violet3};

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
        return props.theme.colors.violet8;
      }
      return props.theme.colors.violet8;
    }};
  }
`;
