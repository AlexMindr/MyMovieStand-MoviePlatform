export const tokens = {
  grey: {
    // 100: "#e8e8e8",
    // 200: "#d1d1d1",
    // 300: "#bababa",
    // 400: "#a3a3a3",
    // 500: "#8c8c8c",
    // 600: "#707070",
    // 700: "#545454",
    // 800: "#383838",
    // 900: "#1c1c1c",
    100: "#e0dbe4",
    200: "#c1b7c9",
    300: "#a292ad",
    400: "#836e92",
    500: "#644a77",
    600: "#503b5f",
    700: "#3c2c47",
    800: "#281e30",
    900: "#140f18",
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
    100: "#d4d4f9",
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
    main: "#F0F0FF",
    hover: "#FFE400",
  },
  watchlistBg: {
    watching: "rgb(153, 255, 51,0.7)",
    completed: "rgb(79, 116, 227,0.7)",
    planToWatch: "rgb(204, 204, 204)",
    onHold: "rgb(240, 230, 140,0.7)",
    dropped: "rgb(244, 138, 160,0.7)",
    basic: "rgb(230,230,230,0.7)",
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
      hover: tokens.background.hover,
    },
    watchlistBg: {
      ...tokens.watchlistBg,
      main: tokens.watchlistBg.basic,
    },
  },
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
    fontSize: 15,
    h1: {
      fontFamily: ["Orbitron", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 32,
      fontWeight: 600,
      color: tokens.grey[700],
    },
    h3: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 24,
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 650,
      lg: 850,
      xl: 1200,
    },
  },
};
