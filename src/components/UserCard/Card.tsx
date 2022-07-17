import styled from "styled-components";
import { Button } from "../Button/Button";

export default function UserCard({ user }: any): JSX.Element {
  return (
    <Container>
      <div className="profile__image__container">
        <img src={user?.photoURL} alt={user?.userName} />
      </div>
      <div className="profile__text">
        <div className="profile__text--fullname">
          {user?.firstName}&nbsp;{user?.lastName}
        </div>
        <div className="profile__text--username">&#64;{user?.userName}</div>
      </div>
      <div className="profile__button">
        <Button variant="primary__block" radius={0.25}>
          Follow
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 0.5rem;

  .profile__image__container {
    width: 50px;
    display: flex;
    align-content: center;
    justify-content: center;

    img {
      border-radius: 50%;
    }
  }

  .profile__text--fullname {
    font-weight: 600;
  }

  .profile__text--username {
    font-size: 14px;
  }

  .profile__button {
    align-self: center;
    /* justify-content: center; */
  }
`;
