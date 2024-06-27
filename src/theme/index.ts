"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
