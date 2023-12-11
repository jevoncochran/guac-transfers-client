import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#609000",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#C0B517",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: "16px" } },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#609000",
            "&:hover": { backgroundColor: "#76a40e" },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            color: "#609000",
            border: "1px solid #609000",
            "&:hover": {
              backgroundColor: "#fcfbe6",
              border: "1px solid #609000",
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: { backgroundColor: "#fff", marginBottom: "16px" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "12px 24px 24px 24px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
          fontFamily: "Barlow Condensed",
          fontWeight: 700,
          fontSize: "32px",
          color: "#609000",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});
