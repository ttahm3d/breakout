import styled from "styled-components";

const Container = styled.section`
  width: min(100% - 2rem, 90em);
  margin: 0 auto;
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: 1fr 4fr;
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export { Container, MainContainer, Page };
