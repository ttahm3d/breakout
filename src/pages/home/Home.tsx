import styled from "styled-components";
import { Loader } from "../../components";
import Members from "../../components/OtherUsers/Members";
import AddPost from "../../components/PostsForm/AddPost";
import { useAppSelector } from "../../hooks";
import Posts from "./Posts";

export default function Home() {
  const { loading } = useAppSelector((s) => s.authReducer);

  if (loading) return <Loader />;

  return (
    <Container>
      <div>
        <AddPost />
        <Posts />
      </div>
      <div className="right-side">
        <Members />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 0.5rem;

  .right-side {
    border-left: 1px solid ${(props) => props.theme.colors.violet7};
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .right-side {
      border: none;
    }
  }
`;
