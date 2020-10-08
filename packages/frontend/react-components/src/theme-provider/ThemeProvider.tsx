import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

export interface ThemeType {
  colors: {
    primary: string;
    primaryAccent: string;
    secondary: string;
    secondaryAccent: string;
    lightGrey: string;
    grey: string;
    darkGrey: string;
    success: string;
    error: string;
    warning: string;
  };
  font: {
    family: {
      primary: string;
      secondary: string;
    };
    sizes: {
      heading1: string;
      heading2: string;
      heading3: string;
      heading4: string;
      heading5: string;
      heading6: string;
      bodyRegular: string;
      bodySmall: string;
      small: string;
    };
    weights: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ThemeProps {
  theme: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProps> = ({ theme, children }) => (
  <SCThemeProvider theme={theme}>
    {children}
  </SCThemeProvider>
);
