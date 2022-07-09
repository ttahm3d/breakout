import styled from "styled-components";
import { Content } from "../../styles/globals";
import ProfileHeader from "./ProfileHeader";

export default function LandingPage(): JSX.Element {
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
