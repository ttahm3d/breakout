import styled from "styled-components";
import { Content } from "../../styles/globals";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserInfo } from "../../redux/features/User/thunk";
import Members from "./Members";

export default function LandingPage(): JSX.Element {
  const { userName } = useParams();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.userReducer);

  useEffect(() => {
    if (userName) dispatch(getUserInfo(userName));
  }, [userName, dispatch, user?.following?.length, user?.followers?.length]);

  return (
    <Content>
      <Container>
        <ProfileHeader />
        <Members />
      </Container>
    </Content>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;
  }
`;
