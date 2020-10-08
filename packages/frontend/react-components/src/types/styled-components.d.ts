// import original module declarations
import "styled-components";
import { ThemeType } from "../theme-provider/ThemeProvider";

// and extend them!
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
