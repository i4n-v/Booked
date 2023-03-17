import { Breakpoint, createTheme, ThemeOptions } from "@mui/material"
import { TypographyOptions } from "@mui/material/styles/createTypography";

type SizeProps = Breakpoint | 'xxl' | 'xs' | "xs-b"
type sizes = {
    [prop in SizeProps]: string;
};

declare module '@mui/material/styles' {
    interface Theme {
      font: sizes,
    }
    export interface ThemeOptions {
      font?: Partial<sizes>,
    }
  }

let theme = createTheme({
    palette: {
        primary: {
            main: "#9B51E0",
            light: "#CAAFE3",
            dark: "#1E0052",
            "400": "#E4D9EE",
            "500": "#CAAFE3",
            "600": "#B180DF",
            "700": "#9b51e0",
            "800": "#8824E6",
            "900": "#720ECF",
            "A100": "#54079D",
            "A200": "#38006C",
            "A400": "#1E0052"
        },
        secondary: {
            main: "#121212",
            light: "#F7F7F7",
            dark: "#000000",
            "50": "#FFFFFF",
            "100": "#F7F7F7",
            "200": "#EDEDED",
            "300": "#DEDEDE",
            "400": "#CCCCCC",
            "500": "#B3B3B3",
            "600": "#9C9C9C",
            "700": "#707070",
            "800":"#595959",
            "900": "#404040",
            A100: "#2E2E2E",
            A200 :"#121212",
            A400: "#000000"
        }   

    },
    typography: {
        allVariants:{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 18
        }
    },
    font: {
        xxl: "500 6.125rem/6.875rem 'Montserrat', sans-serif -1.5%",
        xl: "500 3.813rem/4.625rem 'Montserrat', sans-serif -0.5%",
        lg: "500 2.188rem/2.625rem 'Montserrat', sans-serif -0.25%",
        md: "400 1.25rem/1.625rem 'Montserrat', sans-serif ",
        sm: "400 1rem/1.25rem 'Montserrat', sans-serif 0.5%",
        xs: "400 0.875rem/1.125 'Montserrat', sans-serif 0.25%",
        "xs-b" : "bold 0.875rem/1.125 'Montserrat', sans-serif 1.25%" 
    },
    
})
const include: ThemeOptions = {
    components:{
        MuiInputBase:{
            styleOverrides:{
                root: {
                    height: "44px",            
                    paddding: 0,
                },
                input:{
                    fontSize: theme.font.xs,                    
                },
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              },
              input: {
                color: theme.palette.secondary.main,
                "&::placeholder": {
                  color: theme.palette.secondary.main,
                },
                padding: 0,
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: theme.palette.primary.dark,
                font: theme.font.xs,
                top: "-5px",
              },
              outlined:{
                '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -3px) scale(0.75)',
                  },
              }
            },
          },
    },
}
theme = createTheme(theme,include)

export default theme