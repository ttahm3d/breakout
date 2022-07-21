import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Loader, NoPosts } from "../../components";
import PostCard from "../../components/PostCard/PostCard";
import { useAppSelector } from "../../hooks";

const getLikedPosts = (posts: DocumentData[] | undefined, uid: string) =>
  posts &&
  posts?.filter((post) => post?.likes?.find((p: any) => p.uid === uid));

export default function LikedPosts(): JSX.Element {
  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { user } = useAppSelector((s) => s.userReducer);

  const likedPosts = getLikedPosts(posts, user?.uid);

  if (loading) return <Loader />;

  return (
    <>
      {!loading ? (
        <>
          {likedPosts?.length === 0 ? (
            <NoPosts
              message="You haven't liked any posts so far."
              redirect={true}
              // redirectText="Discover other people"
              redirectPath="home"
            />
          ) : (
            <Container>
              {likedPosts?.map((post) => (
                <PostCard key={post?.pid} post={post} />
              ))}
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
