import { useEffect } from "react";
import styled from "styled-components";
import { UserCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers } from "../../redux/features/User/thunk";

export default function Members(): JSX.Element {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((s) => s.authReducer);
  const { otherUsers: users } = useAppSelector((s) => s.userReducer);

  useEffect(() => {
    if (currentUser?.uid) dispatch(getUsers(currentUser?.uid));
  }, [dispatch, currentUser?.uid]);

  return (
    <Container>
      <h3>Who to Follow?</h3>
      {users?.map((user) => (
        <UserCard user={user} key={user?.uid} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => {
    if (props.theme.title === "dark") {
      return props.theme.colors.violet2;
    }
    return props.theme.colors.violet3;
  }};
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  height: max-content;

  h3 {
    padding-bottom: 1rem;
  }

  @media screen and (max-width: 56.25em) {
    display: none;
  }
`;
