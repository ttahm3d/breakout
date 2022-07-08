import BreakoutLogo from "../../assets/icons/BreakoutIcon.svg";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { IconButton, Button } from "../Button/Button";
import styled from "styled-components";
import { Container } from "../../styles/globals";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signOutHandler } from "../../redux/services/authServices";

type HeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

export default function Header({
  theme,
  toggleTheme,
}: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  const { user } = useAppSelector((s) => s.authReducer);
  const dispatch = useAppDispatch();

  return (
    <HeaderComponent>
      <Container>
        <Navbar>
          <Logo>
            <img src={BreakoutLogo} alt="Breakout Logo" />
          </Logo>
          <NavItems>
            {user !== undefined ? (
              <>
                <UserInfo>
                  <div className="image">
                    <img
                      src={user.photoURL}
                      alt={user.firstName}
                      width={24}
                      height={24}
                    />
                  </div>
                  Hi {user.firstName}
                </UserInfo>
                <Button
                  variant="secondary__cta"
                  radius={0.25}
                  onClick={() => dispatch(signOutHandler())}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="secondary__cta"
                radius={0.25}
                onClick={() => navigate("/auth/signin")}>
                Login
              </Button>
            )}

            <IconButton
              aria-label="Toggle Theme"
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
  border-bottom: 1px solid ${(props) => props.theme.colors.violet7};
  background-color: ${(props) => props.theme.colors.violet1};
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    border-radius: 50%;
  }
`;
