import { DocumentData } from "firebase/firestore";
import { useMemo } from "react";
import styled from "styled-components";
import { NoPosts } from "../../components";
import PostCard from "../../components/PostCard/PostCard";
import { useAppSelector } from "../../hooks";

export default function Posts(): JSX.Element {
  const { posts } = useAppSelector((s) => s.postsReducer);
  const { currentUser } = useAppSelector((s) => s.authReducer);

  const followingIds = useMemo(() => {
    return currentUser?.following?.reduce(
      (acc: string[], cur: any) => {
        return [...acc, cur?.uid];
      },
      [currentUser?.uid]
    );
  }, [currentUser]);

  const getTimelinePosts = (
    posts: DocumentData[] | undefined,
    userIds: string[]
  ) => posts?.filter((post) => userIds.includes(post?.userId));

  const timelinePosts = getTimelinePosts(posts, followingIds);

  return (
    <>
      {timelinePosts?.length === 0 ? (
        <NoPosts
          message="No posts to show"
          redirect={true}
          redirectText="Discover others on Breakout or add a post yourself."
          redirectPath="discover"
        />
      ) : (
        <Container>
          {timelinePosts?.map((post) => (
            <PostCard key={post?.pid} post={post} />
          ))}
        </Container>
      )}
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
