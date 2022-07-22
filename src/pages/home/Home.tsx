import styled from "styled-components";
import { Members } from "../../components";
import AddPost from "./AddPost";
import { useAppSelector } from "../../hooks";
import Posts from "./Posts";

export default function Home() {
  const { loading } = useAppSelector((s) => s.authReducer);

  return (
    <>
      {!loading ? (
        <Container>
          <div className="left-side">
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
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 0.5rem;

  .left-side {
    padding: 1rem 0;
    border-left: 1px solid ${(props) => props.theme.colors.slate7};
    border-right: 1px solid ${(props) => props.theme.colors.slate7};
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .left-side {
      border: none;
    }
  }
`;
