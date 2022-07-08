import BreakoutLogo from "../../assets/icons/BreakoutIcon.svg";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { IconButton, Button } from "../Button/Button";
import styled from "styled-components";
import { Container } from "../../styles/globals";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signOutHandler } from "../../redux/services/authServices";
import { useState } from "react";

type HeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

export default function Header({
  theme,
  toggleTheme,
}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { user } = useAppSelector((s) => s.authReducer);
  const dispatch = useAppDispatch();

  const toggleDropdown = () => setShowDropdown((s) => !s);
  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

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
                <UserInfo
                  onClick={toggleDropdown}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}>
                  <UserImage className="image">
                    <img
                      src={user.photoURL}
                      alt={user.firstName}
                      width={24}
                      height={24}
                    />
                  </UserImage>
                  Hi {user.firstName}
                  {showDropdown && (
                    <Dropdown>
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem onClick={() => dispatch(signOutHandler())}>
                        Sign Out
                      </DropdownItem>
                    </Dropdown>
                  )}
                </UserInfo>
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
  border-radius: 0.25rem;
  padding: 0.4rem 0.75rem;
  background-color: ${(props) => props.theme.colors.violet3};
  color: ${(props) => props.theme.colors.violet11};
`;

const UserImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 105%;
  right: 0;
  width: 6.9rem;
  background-color: ${(props) => props.theme.colors.violet3};
`;

const DropdownItem = styled.div`
  padding: 0.4rem 0.75rem;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.violet4};
    outline: 1px solid ${(props) => props.theme.colors.violet8};
    outline-offset: -1px;
  }

  :active {
    background-color: ${(props) => props.theme.colors.violet5};
  }

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.violet7};
  }
`;
