import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    dialog: true;
    menu: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mainHeading: true;
    sectionLabel: true;
    finePrint: true;
    finePrintImportant: true;
    cardLabel: true;
    cardSubLabel: true;
    cardDate: true;
    cardSent: true;
    cardReceived: true;
  }
}

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#609000",
      light: "#f4f8e6",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#C0B517",
      light: "#d3cb1f",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFF",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: { variantMapping: { mainHeading: "p" } },
      variants: [
        {
          props: { variant: "mainHeading" },
          style: {
            fontWeight: 700,
            marginBottom: "16px",
            fontSize: "24px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            marginTop: "-12px",
            marginBottom: "24px",
          },
        },
        {
          props: { variant: "sectionLabel" },
          style: {
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "finePrint" },
          style: {
            color: "#609000",
            display: "block",
            fontSize: "14px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "finePrintImportant" },
          style: {
            display: "block",
            fontSize: "14px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "cardLabel" },
          style: {
            display: "block",
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "cardSubLabel" },
          style: {
            display: "block",
            fontSize: "14px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "cardDate" },
          style: {
            display: "block",
            fontSize: "16px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "cardSent" },
          style: {
            display: "block",
            fontSize: "16px",
            fontFamily: "Roboto",
          },
        },
        {
          props: { variant: "cardReceived" },
          style: {
            display: "block",
            fontSize: "14px",
            fontFamily: "Roboto",
          },
        },
      ],
    },
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
        root: { backgroundColor: "#fff" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "12px 24px 24px 24px",
        },
      },
      variants: [
        {
          props: { variant: "dialog" },
          style: {
            padding: "12px 24px 24px 24px",
          },
        },
        {
          props: { variant: "menu" },
          style: {
            padding: 0,
          },
        },
      ],
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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
            color: "#609000",
          },
        },
      },
    },
  },
});
