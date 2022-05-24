import { ThemeProvider } from "styled-components";
import { Header, Footer } from "./components";
import { LightTheme, DarkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles";
import { useLocalStorage } from "./hooks";
import { Page } from "./styles/globals";

function App(): JSX.Element {
  const [theme, setTheme] = useLocalStorage("breakout-theme", "light");

  const toggleTheme: () => void = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <Page>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Footer />
      </Page>
    </ThemeProvider>
  );
}

export default App;
