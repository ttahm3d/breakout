import styled from "styled-components";
import BreakoutBanner from "../../assets/backgrounds/BreakoutBanner.svg";

interface Props {
  message: string;
  redirect?: boolean;
  redirectText?: string;
  redirectPath?: string;
}

export default function NoPosts({
  message,
  redirect,
  redirectPath,
  redirectText,
}: Props): JSX.Element {
  return (
    <Container>
      <h4>{message}</h4>
      <img src={BreakoutBanner} alt="Breakout banner" />
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 1rem;
`;
