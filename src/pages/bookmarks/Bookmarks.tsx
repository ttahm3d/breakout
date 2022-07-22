import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components";
import { Loader, Members, NoPosts, PostCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllPosts } from "../../redux/features/Posts/thunk";

const getBookmarkedPosts = (posts: DocumentData[] | undefined, uid: string) =>
  posts &&
  posts?.filter((post) => post?.bookmarks?.find((p: any) => p.uid === uid));

export default function Bookmarks(): JSX.Element {
  const dispatch = useAppDispatch();

  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { currentUser } = useAppSelector((s) => s.authReducer);

  const bookmarkedPosts = getBookmarkedPosts(posts, currentUser?.uid);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container>
      {!loading ? (
        <div className="left-side">
          {bookmarkedPosts?.length === 0 ? (
            <NoPosts
              message="No bookmarked posts"
              redirect={true}
              redirectText="Save posts that you find interesting"
              redirectPath="home"
            />
          ) : (
            <PostsContainer>
              {bookmarkedPosts?.map((post) => (
                <PostCard key={post?.pid} post={post} />
              ))}
            </PostsContainer>
          )}
        </div>
      ) : null}
      <div className="right-side">
        <Members />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 0.5rem;

  .left-side {
    border-left: 1px solid ${(props) => props.theme.colors.violet7};
    border-right: 1px solid ${(props) => props.theme.colors.violet7};
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .right-side {
      display: none;
    }
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
