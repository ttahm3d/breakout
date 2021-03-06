import {
  blue,
  blueDark,
  orange,
  orangeDark,
  red,
  redDark,
  slate,
  slateDark,
  mauve,
  mauveDark,
  teal,
  tealDark,
  plum,
  plumDark,
  violet,
  violetDark,
  indigo,
  indigoDark,
  gray,
  grayDark,
  purple,
  purpleDark,
  pink,
  pinkDark,
} from "@radix-ui/colors";

const LightTheme = {
  colors: {
    ...blue,
    ...gray,
    ...plum,
    ...slate,
    ...teal,
    ...red,
    ...mauve,
    ...orange,
    ...violet,
    ...indigo,
    ...purple,
    ...pink,
    white: "#fff",
    black: "#000",
  },
  title: "light",
};

const DarkTheme = {
  colors: {
    ...blueDark,
    ...grayDark,
    ...plumDark,
    ...slateDark,
    ...redDark,
    ...tealDark,
    ...mauveDark,
    ...orangeDark,
    ...violetDark,
    ...indigoDark,
    ...purpleDark,
    ...pinkDark,
    white: "#fff",
    black: "#000",
  },
  title: "dark",
};

export { LightTheme, DarkTheme };
