import BreakoutLogo from "../../assets/icons/BreakoutIcon.svg";
import styled from "styled-components";
import { RiLinkedinFill, RiGithubLine, RiTwitterLine } from "react-icons/ri";
import { Container } from "../../styles/globals";

export default function Footer() {
  const externalLinks = [
    {
      id: 1,
      name: "Github",
      icon: <RiGithubLine />,
      path: "https://github.com/ttahm3d",
    },
    {
      id: 2,
      name: "Linked In",
      icon: <RiLinkedinFill />,
      path: "https://www.linkedin.com/in/tahirahmedt/",
    },
    {
      id: 3,
      name: "Twitter",
      icon: <RiTwitterLine />,
      path: "https://twitter.com/ttahm3d",
    },
  ];

  return (
    <FooterWrapper>
      <Container>
        <FooterContainer>
          <Logo>
            <img src={BreakoutLogo} alt="Breakout Logo" />
          </Logo>
          <FooterLinksWrapper>Internal Links</FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterHeader>Other Links</FooterHeader>
            <LinksContainer>
              {externalLinks.map(({ id, name, icon, path }) => (
                <ExtLink href={path} key={id}>
                  <div className="icon">{icon}</div>
                  <>{name}</>
                </ExtLink>
              ))}
            </LinksContainer>
          </FooterLinksWrapper>
        </FooterContainer>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding: 2rem 0;
  margin-top: auto;
  border-top: 1px solid ${(props) => props.theme.colors.violet7};
`;

const FooterContainer = styled.section`
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterLinksWrapper = styled.footer``;

const FooterHeader = styled.div`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

// const FooterLink = styled(Link)`
//   color: ${(props) => props.theme.colors.slate11};

//   :hover {
//     color: ${(props) => props.theme.colors.slate12};
//   }
// `;

const ExtLink = styled.a`
  display: flex;
  gap: 1rem;
  color: ${(props) => props.theme.colors.gray12};

  :hover {
    color: ${(props) => props.theme.colors.mauve12};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
`;

const Logo = styled.div``;
