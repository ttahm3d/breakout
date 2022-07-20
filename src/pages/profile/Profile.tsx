import styled from "styled-components";
import { Content } from "../../styles/globals";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserInfo } from "../../redux/features/User/thunk";
import Members from "./Members";
import { getPostsByUserName } from "../../redux/features/Posts/thunk";

export default function LandingPage(): JSX.Element {
  const { userName } = useParams();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.userReducer);

  useEffect(() => {
    if (userName) {
      dispatch(getUserInfo(userName));
      dispatch(getPostsByUserName(userName));
    }
  }, [userName, dispatch, user?.following?.length, user?.followers?.length]);

  return (
    <Container>
      <div className="left-side">
        <ProfileHeader />
      </div>
      <div className="right-side">
        <Members />
      </div>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  padding: 0.5rem 0;

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
