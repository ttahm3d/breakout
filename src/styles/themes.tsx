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
  violetDark,
  violet,
  indigo,
  indigoDark,
  gray,
  grayDark,
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
    white: "#fff",
    black: "#000",
  },
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
    white: "#fff",
    black: "#000",
  },
};

export { LightTheme, DarkTheme };
