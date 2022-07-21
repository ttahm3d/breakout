import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Loader, NoPosts } from "../../components";
import PostCard from "../../components/PostCard/PostCard";
import AllCaughtUp from "../../components/Utils/AllCaughtUp";
import { useAppSelector } from "../../hooks";

const getPostsOfCurrentUser = (
  posts: DocumentData[] | undefined,
  uid: string
) => posts && posts?.filter((post) => post?.userId === uid);

export default function Posts(): JSX.Element {
  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { user } = useAppSelector((s) => s.userReducer);

  const postsOfCurrentUser = getPostsOfCurrentUser(posts, user?.uid);

  if (loading) return <Loader />;

  return (
    <>
      {!loading ? (
        <>
          {postsOfCurrentUser?.length === 0 ? (
            <NoPosts
              message="No posts to show"
              redirect={true}
              redirectText="Discover other people"
              redirectPath="discover"
            />
          ) : (
            <Container>
              {postsOfCurrentUser?.map((post) => (
                <PostCard key={post?.pid} post={post} />
              ))}
              <AllCaughtUp message="That's all the posts you have made till date. Add new?" />
            </Container>
          )}
        </>
      ) : null}
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
