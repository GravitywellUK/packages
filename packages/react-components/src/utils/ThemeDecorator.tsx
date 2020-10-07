import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

const themeDecorator: (story: () => React.ReactElement) => React.ReactElement = story => {
  return (
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  );
};

export default themeDecorator;

export enum BreakPoints {
  xs = "0",
  sm = "+300",
  md = "+501",
  lg = "+750",
  xl = "+960"
}

export enum BorderRadius {
  small = "0.5rem",
  medium = "1rem",
  large = "1.5rem"
}

export enum Colors {
  primary = "#273163",
  primaryAccent = "#686F92",
  secondary = "#ECE8BD",
  secondaryAccent = "#F5F3DE",
  lightGrey = "#D4D6E0",
  grey = "#A9ADC1",
  darkGrey = "#7D83A1",
  success = "#3FBF83",
  error = "#99122D",
  warning = "#F2911F"
}

export const theme: DefaultTheme = {
  breakpoints: BreakPoints,
  colors: {
    primary: Colors.primary,
    primaryAccent: Colors.primaryAccent,
    secondary: Colors.secondary,
    secondaryAccent: Colors.secondaryAccent,
    lightGrey: Colors.lightGrey,
    grey: Colors.grey,
    darkGrey: Colors.darkGrey,
    success: Colors.success,
    error: Colors.error,
    warning: Colors.warning
  },
  font: {
    family: {
      primary: "Arial, sans-serif",
      secondary: "Helvetica, sans-serif"
    },
    sizes: {
      heading1: "3.6rem",
      heading2: "2.8rem",
      heading3: "2.6rem",
      heading4: "2rem",
      heading5: "1.8rem",
      heading6: "1.4rem",
      bodyRegular: "1.6rem",
      bodySmall: "1.5rem",
      small: "1.2rem"
    },
    weights: {
      light: 400,
      regular: 400,
      medium: 600,
      bold: 700
    }
  },
  borderRadius: {
    small: BorderRadius.small,
    medium: BorderRadius.medium,
    large: BorderRadius.large
  }
};
