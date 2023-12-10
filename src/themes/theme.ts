import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
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
        root: { backgroundColor: "#fff", marginBottom: "12px" },
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
