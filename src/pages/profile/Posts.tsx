import styled from "styled-components";
import PostCard from "../../components/PostCard/PostCard";
import { useAppSelector } from "../../hooks";

export default function Posts(): JSX.Element {
  const { postsOfCurrentUser } = useAppSelector((s) => s.postsReducer);

  return (
    <Container>
      {postsOfCurrentUser?.map((post) => (
        <PostCard key={post?.pid} post={post} />
      ))}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
