export const tokens = {
  grey: {
    100: "#e8e8e8",
    200: "#d1d1d1",
    300: "#bababa",
    400: "#a3a3a3",
    500: "#8c8c8c",
    600: "#707070",
    700: "#545454",
    800: "#383838",
    900: "#1c1c1c",
  },
  primary: {
    // purple
    100: "#f5ccff",
    200: "#eb99ff",
    300: "#e066ff",
    400: "#d633ff",
    500: "#cc00ff",
    600: "#a300cc",
    700: "#7a0099",
    800: "#520066",
    900: "#290033",
  },
  secondary: {
    // blue
    100: "#ced0e8",
    200: "#9ea1d1",
    300: "#6d73b9",
    400: "#3d44a2",
    500: "#0c158b",
    600: "#0a116f",
    700: "#070d53",
    800: "#050838",
    900: "#02041c",
  },
  tertiary: {
    //magenta
    100: "#fbcee8",
    200: "#f69dd1",
    300: "#f26cba",
    400: "#ed3ba3",
    500: "#e90a8c",
    600: "#ba0870",
    700: "#8c0654",
    800: "#5d0438",
    900: "#2f021c",
  },
  background: {
    light: "#FFFFFF",
    main: "#FAE6FF",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
      main: tokens.tertiary[500],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};
