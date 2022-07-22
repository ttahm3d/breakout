import styled from "styled-components";
import { LargeUserCard, Loader } from "../../components";
import { useAppSelector } from "../../hooks";

export default function Bookmarks(): JSX.Element {
  const { otherUsers: users, loading } = useAppSelector((s) => s.userReducer);

  if (loading) return <Loader />;

  return (
    <Container>
      <div className="profiles__container">
        {users?.map((user) => (
          <LargeUserCard user={user} key={user?.uid} showBtn={true} />
        ))}
      </div>
      <div className="right-side"></div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 0.5rem;

  .profiles__container {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${(props) => props.theme.colors.violet7};
    border-right: 1px solid ${(props) => props.theme.colors.violet7};
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .profiles__container {
      border: 0;
    }

    .right-side {
      display: none;
    }
  }
`;
