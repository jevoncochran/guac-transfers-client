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
  },
});
