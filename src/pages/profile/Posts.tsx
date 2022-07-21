import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Loader } from "../../components";
import PostCard from "../../components/PostCard/PostCard";
import { useAppSelector } from "../../hooks";

export default function Posts(): JSX.Element {
  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { user } = useAppSelector((s) => s.userReducer);

  const getPostsOfCurrentUser = (
    posts: DocumentData[] | undefined,
    uid: string
  ) => posts && posts?.filter((post) => post?.userId === uid);
  const postsOfCurrentUser = getPostsOfCurrentUser(posts, user?.uid);

  if (loading) return <Loader />;

  return (
    <>
      {!loading ? (
        <Container>
          {postsOfCurrentUser?.map((post) => (
            <PostCard key={post?.pid} post={post} />
          ))}
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
