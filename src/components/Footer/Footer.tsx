import BreakoutLogo from "../../assets/icons/BreakoutIcon.svg";
import styled from "styled-components";
import { RiLinkedinFill, RiGithubLine, RiTwitterLine } from "react-icons/ri";
import { Container } from "../../styles/globals";
import { useMemo } from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

type Links = {
  id: number;
  text: string;
  icon?: IconType;
  path: string;
};

export default function Footer() {
  const externalLinks: Links[] = useMemo(() => {
    return [
      {
        id: 1,
        text: "Github",
        icon: RiGithubLine,
        path: "https://github.com/ttahm3d",
      },
      {
        id: 2,
        text: "Linked In",
        icon: RiLinkedinFill,
        path: "https://www.linkedin.com/in/tahirahmedt/",
      },
      {
        id: 3,
        text: "Twitter",
        icon: RiTwitterLine,
        path: "https://twitter.com/ttahm3d",
      },
    ];
  }, []);

  const internalLinks: Links[] = useMemo(() => {
    return [
      {
        id: 1,
        text: "Home",
        path: "/home",
      },
      {
        id: 2,
        text: "Explore",
        path: "/explore",
      },
      {
        id: 3,
        text: "Discover",
        path: "/discover",
      },
      {
        id: 4,
        text: "Bookmarks",
        path: "/bookmarks",
      },
      {
        id: 5,
        text: "Profile",
        path: "/profile",
      },
    ];
  }, []);

  return (
    <FooterWrapper>
      <Container>
        <FooterContainer>
          <Logo>
            <img src={BreakoutLogo} alt="Breakout Logo" />
          </Logo>
          <FooterLinksWrapper>
            <FooterHeader>Internal Links</FooterHeader>
            <LinksContainer>
              {internalLinks.map((link) => (
                <ExtLink href={link.path} key={link.id}>
                  <>{link.text}</>
                </ExtLink>
              ))}
            </LinksContainer>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterHeader>Other Links</FooterHeader>
            <LinksContainer>
              {externalLinks.map((item) => (
                <IntLink to={item.path} key={item.id}>
                  <>{item.text}</>
                </IntLink>
              ))}
            </LinksContainer>
          </FooterLinksWrapper>
        </FooterContainer>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding: 2rem 0 8rem;
  margin-top: auto;
  border-top: 1px solid ${(props) => props.theme.colors.slate6};

  @media screen and (min-width: 56.25em) {
    padding: 2rem 0;
  }
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

const IntLink = styled(Link)`
  color: ${(props) => props.theme.colors.gray11};

  :hover {
    color: ${(props) => props.theme.colors.mauve12};
  }
`;

const ExtLink = styled.a`
  display: flex;
  gap: 1rem;
  color: ${(props) => props.theme.colors.gray11};

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
