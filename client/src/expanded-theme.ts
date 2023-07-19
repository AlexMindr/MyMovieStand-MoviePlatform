/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import {
  Palette,
  PaletteColor,
  TypeBackground,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
    watching: string;
    completed: string;
    onHold: string;
    planToWatch: string;
    dropped: string;
    main: string;
  }
  interface Palette {
    tertiary: PaletteColor;
    watchlistBg: PaletteColor;
  }
  interface TypeBackground {
    hover: string;
  }
}
