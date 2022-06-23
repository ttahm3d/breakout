import styled from "styled-components";

const Container = styled.section`
  width: min(100% - 2rem, 80em);
  margin: 0 auto;
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 56.25em) {
    grid-template-columns: 1fr 5fr;
    gap: 2rem;
  }
`;

const Content = styled.section`
  padding: 2rem 0;
  min-height: 80vh;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export { Container, Content, MainContainer, Page };
