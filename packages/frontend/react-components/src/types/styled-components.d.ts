// import original module declarations
import "styled-components";
import { ThemeType } from "../theme-provider/ThemeProvider";

// and extend them!
declare module "styled-components" {

  export type DefaultTheme = ThemeType;
}
