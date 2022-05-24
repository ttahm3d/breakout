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
} from "@radix-ui/colors";

const LightTheme = {
  colors: {
    ...blue,
    ...plum,
    ...slate,
    ...teal,
    ...red,
    ...mauve,
    ...orange,
  },
};

const DarkTheme = {
  colors: {
    ...blueDark,
    ...plumDark,
    ...slateDark,
    ...redDark,
    ...tealDark,
    ...mauveDark,
    ...orangeDark,
  },
};

export { LightTheme, DarkTheme };
