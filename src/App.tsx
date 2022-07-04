import { ThemeProvider } from "styled-components";
import { Header, Footer, NavMenu, ToastComponent } from "./components";
import { LightTheme, DarkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles";
import { useAppDispatch, useLocalStorage } from "./hooks";
import { Container, MainContainer, Page } from "./styles/globals";
import { useLocation } from "react-router-dom";
import Router from "./router";
import { useEffect } from "react";
import { getUserDetails } from "./redux/services/userServices";

function App(): JSX.Element {
  const [theme, setTheme] = useLocalStorage("breakout-theme", "light");
  const disptach = useAppDispatch();

  const toggleTheme: () => void = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const { pathname } = useLocation();

  const uid = localStorage.getItem("breakout/user-id");
  useEffect(() => {
    if (uid !== null) disptach(getUserDetails(uid));
  }, [uid]);

  const showNavMenu =
    pathname !== "/" &&
    pathname !== "/auth/signin" &&
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
      <ToastComponent />
    </ThemeProvider>
  );
}

export default App;
