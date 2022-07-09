import styled from "styled-components";
import { Content } from "../../styles/globals";

export default function LandingPage(): JSX.Element {
  return (
    <Content>
      <Container>
        <div>Profile</div>
        <div>Other stuff</div>
      </Container>
    </Content>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
