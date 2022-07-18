import { DocumentData } from "firebase/firestore";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  followUserHandler,
  unfollowUserHandler,
} from "../../redux/features/Auth/thunk";
import { getUserInfo } from "../../redux/features/User/thunk";
import { Button } from "../Button/Button";

type CardProps = {
  user: DocumentData;
  showBtn?: boolean;
};

export default function UserCard({
  user,
  showBtn = true,
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.authReducer.currentUser);

  const handleClick = (e: any, user: any) => {
    e.stopPropagation();
    dispatch(followUserHandler(user?.uid));
  };

  const handleFollow = (e: Event, user: any) => {
    dispatch(followUserHandler(user?.uid));
    dispatch(getUserInfo(user?.userName));
  };

  const handleUnfollow = (e: Event, user: any) => {
    console.log("test", user);
    dispatch(unfollowUserHandler(user?.uid));
    dispatch(getUserInfo(user?.userName));
  };

  const followingIds = useMemo(() => {
    return currentUser?.following?.reduce((acc: string[], cur: any) => {
      return [...acc, cur?.uid];
    }, []);
  }, [currentUser]);

  const isAlreadyBeingFollowed = followingIds.some(
    (id: string) => id === user?.uid
  );

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
      {showBtn && (
        <div className="profile__button">
          {isAlreadyBeingFollowed ? (
            <Button
              variant="primary__cta"
              radius={0.25}
              onClick={(e: any) => handleUnfollow(e, user)}>
              Following
            </Button>
          ) : (
            <Button
              variant="primary__block"
              radius={0.25}
              onClick={(e: any) => handleFollow(e, user)}>
              Follow
            </Button>
          )}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 0.5rem;

  :hover {
    background-color: ${(props) => props.theme.colors.violet4};
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
    justify-self: end;
  }
`;
