import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Account,
  Config,
  DarkLogo,
  Logout,
  Menu,
  User,
} from "../../../assets/SVG";
import {
  Button,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { NavBarProps } from "./types";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown";
import { AuthContext } from "../../../contexts/AuthContext";
import useAuth from "../../../services/useAuth";
import { useMutation } from "react-query";
import Cookies from 'js-cookie';
import { AuthActionsKind } from "../../../contexts/AuthContext/types";

export default function NavBar({ logged }: NavBarProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [authData, authDispatch] = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useAuth();
  const logoutMutation = useMutation(logout);

  const MenuItem = styled(Button)(({ theme }) => ({
    font: theme.font.md,
    color: theme.palette.secondary[800],
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.primary[700],
    },
  }));

  const NavigationContainer = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1400px",
    "#burguer-menu": {
      display: "none",
      cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
      "#burguer-menu": {
        display: "inline-flex",
      },
      "& > div": {
        display: logged ? "flex" : "none",
        "& > button": {
          display: "none",
        },
        "& > button + button": {
          display: "inline-flex",
        },
      },
    },
  }));

  const navigationOptions = [
    {
      label: "Entrar",
      handler: () => navigate("/login"),
    },
    {
      label: "Registrar",
      handler: () => navigate("/register"),
    },
    {
      label: "Explorar",
      handler: () => navigate("/home"),
    },
  ];

  const loggedNavigationOptions = [
    {
      label: "Perfil",
      icon: <User />,
      handler: () => navigate("/profile"),
    },
    {
      label: "Condigurações",
      icon: <Config />,
      handler: () => navigate("profile/settings"),
    },
    {
      label: "Sair",
      icon: (
        <Logout
          style={{
            marginLeft: "4px",
          }}
        />
      ),
      handler: () => {
        logoutMutation.mutate(undefined, {
          onSuccess: () => {
            localStorage.clear()
            Cookies.remove('x-access-token')
            authDispatch({ type: AuthActionsKind.SET_USER_DATA, payload: { userData: undefined } })
            navigate('/login', { replace: true })

          }
        })
      },
    },
  ];

  return (
    <AppBar
      elevation={1}
      position="sticky"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: "20px",
        minHeight: "80px",
      }}
    >
      <NavigationContainer disableGutters>
        <Link to="/">
          <DarkLogo />
        </Link>
        <Box display={"flex"} columnGap={3}>
          <MenuItem>Explorar</MenuItem>
          {!logged ? (
            <>
              <MenuItem onClick={() => navigate("/login")}>Entrar</MenuItem>
              <Button
                variant="outlined"
                sx={{
                  font: (t) => t.font.sm,
                  textTransform: "none",
                }}
                onClick={() => navigate("/register")}
              >
                Registre-se
              </Button>
            </>
          ) : (
            <IconButton
              id="profile-menu"
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "8px",
                "&:hover": {
                  background: "initial",
                },
              }}
              onClick={() => setDropdown(true)}
            >
              <Typography
                sx={{
                  font: theme.font.md,
                  color: theme.palette.secondary[800],
                }}
              >
                {authData?.userData?.user_name}
              </Typography>
              <Account />
            </IconButton>
          )}
          {!logged && (
            <IconButton id="burguer-menu" onClick={() => setDropdown(true)}>
              <Menu />
            </IconButton>
          )}
          <Dropdown
            open={dropdown}
            anchorId={logged ? "profile-menu" : "burguer-menu"}
            options={!logged ? navigationOptions : loggedNavigationOptions}
            handleClose={() => setDropdown(false)}
          />
        </Box>
      </NavigationContainer>
    </AppBar>
  );
}
