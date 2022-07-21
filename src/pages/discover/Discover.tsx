import styled from "styled-components";
import { LargeUserCard } from "../../components";
import { useAppSelector } from "../../hooks";

export default function Bookmarks(): JSX.Element {
  const { otherUsers: users } = useAppSelector((s) => s.userReducer);

  return (
    <Container>
      <div className="profiles__container">
        {users?.map((user) => (
          <LargeUserCard user={user} key={user?.uid} showBtn={true} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;

  .profiles__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
