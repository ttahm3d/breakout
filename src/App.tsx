import { ThemeProvider } from "styled-components";
import { Header, Footer } from "./components";
import { LightTheme, DarkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles";
import { useLocalStorage } from "./hooks";
import { Container, Page } from "./styles/globals";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

function App(): JSX.Element {
  const [theme, setTheme] = useLocalStorage("breakout-theme", "light");

  const toggleTheme: () => void = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        <GlobalStyle />
        <Page>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Container>
            <Router />
          </Container>
          <Footer />
        </Page>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
