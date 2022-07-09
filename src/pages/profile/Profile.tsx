import styled from "styled-components";
import { Content } from "../../styles/globals";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getUserInfo } from "../../redux/features/User/thunk";

export default function LandingPage(): JSX.Element {
  const { userName } = useParams();
  const dispatch = useAppDispatch();

  console.log(userName);

  useEffect(() => {
    if (userName) dispatch(getUserInfo(userName));
  }, [userName]);

  return (
    <Content>
      <Container>
        <ProfileHeader />
        <div>Other stuff</div>
      </Container>
    </Content>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;
  }
`;
