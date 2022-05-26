import styled from "styled-components";

export default function NavMenu(): JSX.Element {
  return (
    <MenuBar>
      <h3>sidebar</h3>
    </MenuBar>
  );
}

const MenuBar = styled.aside`
  background-color: ${(props) => props.theme.colors.plum2};
  position: sticky;

  @media screen and (max-width: 64em) {
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8;
    right: 0;
    display: flex;
  }
`;
