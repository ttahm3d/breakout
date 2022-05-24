import BreakoutLogo from "../../assets/icons/BreakoutIcon.svg";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { IconButton } from "../Button/Button";
import styled from "styled-components";
import { Container } from "../../styles/globals";

type HeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

export default function Header({
  theme,
  toggleTheme,
}: HeaderProps): JSX.Element {
  return (
    <HeaderComponent>
      <Container>
        <Navbar>
          <Logo>
            <img src={BreakoutLogo} alt="Breakout Logo" />
          </Logo>
          <NavItems>
            <IconButton
              icon={theme === "light" ? <IoMdMoon /> : <FiSun />}
              onClick={toggleTheme}
            />
          </NavItems>
        </Navbar>
      </Container>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.header`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.slate7};
  background-color: ${(props) => props.theme.colors.slate1};
  z-index: 9;
  position: sticky;
  top: 0;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItems = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const MenuButton = styled(IconButton)`
//   font-size: 1.25rem;
//   margin-right: 1rem;
//   display: ${({ pathname }) => (pathname === "/" ? "none" : "flex")};

//   @media screen and (min-width: 64em) {
//     display: none;
//   }
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
// `;
