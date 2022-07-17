import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Button/Button";

export default function UserCard({ user }: any): JSX.Element {
  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log("testing follow btn");
  };

  return (
    <Container>
      <div className="profile__image__container">
        <img src={user?.photoURL} alt={user?.userName} />
      </div>
      <div className="profile__text">
        <Link to={`/profile/${user?.userName}`}>
          <div className="profile__text--fullname">
            {user?.firstName}&nbsp;{user?.lastName}
          </div>
          <div className="profile__text--username">&#64;{user?.userName}</div>
        </Link>
      </div>
      <div className="profile__button">
        <Button
          variant="primary__block"
          radius={0.25}
          onClick={(e: any) => handleClick(e)}>
          Follow
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 0.5rem;

  :hover {
    background-color: ${(props) => props.theme.colors.violet2};
  }

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
    color: ${(props) => props.theme.colors.gray12};
    font-weight: 600;
  }

  .profile__text--username {
    font-size: 14px;
    color: ${(props) => props.theme.colors.mauve11};
  }

  .profile__button {
    align-self: center;
  }
`;
