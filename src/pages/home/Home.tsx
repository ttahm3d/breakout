import styled from "styled-components";
import { Loader } from "../../components";
import AddPost from "../../components/Posts/AddPost";
import { useAppSelector } from "../../hooks";
import { Content } from "../../styles/globals";

export default function Home() {
  const { loading } = useAppSelector((s) => s.authReducer);

  if (loading) return <Loader />;

  return (
    <Container>
      <div>
        <AddPost />
      </div>
      <h4>Other users</h4>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
`;
