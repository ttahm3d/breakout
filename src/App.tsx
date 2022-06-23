import { ThemeProvider } from "styled-components";
import { Header, Footer, NavMenu } from "./components";
import { LightTheme, DarkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles";
import { useLocalStorage } from "./hooks";
import { Container, MainContainer, Page } from "./styles/globals";
import { useLocation } from "react-router-dom";
import Router from "./router";

function App(): JSX.Element {
  const [theme, setTheme] = useLocalStorage("breakout-theme", "light");

  const toggleTheme: () => void = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const { pathname } = useLocation();

  const showNavMenu =
    pathname !== "/" &&
    pathname !== "/auth/sigin" &&
    pathname !== "/auth/signup";

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <Page>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Container>
          <MainContainer showNavMenu={showNavMenu}>
            {showNavMenu && <NavMenu />}
            <Router />
          </MainContainer>
        </Container>
        <Footer />
      </Page>
    </ThemeProvider>
  );
}

export default App;
