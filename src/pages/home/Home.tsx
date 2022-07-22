import styled from "styled-components";
import { Loader, Members } from "../../components";
import AddPost from "./AddPost";
import { useAppSelector } from "../../hooks";
import Posts from "./Posts";

export default function Home() {
  const { loading } = useAppSelector((s) => s.authReducer);

  if (loading) return <Loader />;

  return (
    <>
      {!loading ? (
        <Container>
          <div>
            <AddPost />
            <Posts />
          </div>
          <div className="right-side">
            <Members />
          </div>
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 4fr 2fr;
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
