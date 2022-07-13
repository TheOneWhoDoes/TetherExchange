import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircle from "@mui/icons-material/AccountCircle";

const ResponsiveAppBar = () => {
  const auth = useSelector((state) => state.data.auth);
  return (
    <AppBar
      position="static"
      sx={{ justifyContent: "space-between", backgroundColor: "darkblue" }}
    >
      <Container maxWidth="xl" sx={{ justifyContent: "space-between" }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <PhoneIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            <div style={{ textAlign: "-webkit-center" }}>
              <div className="LogoBar" />
            </div>
          </Typography>

          {auth === null ? (
            <Box>
              <Link
                to={{
                  pathname: "/login",
                }}
              >
                <button className="button-36">ورود / ثبت نام</button>
              </Link>
            </Box>
          ) : (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                style={{ fontSize: "1rem" }}
              >
                {auth}
                <AccountCircle style={{ fontSize: "3rem" }} />
              </IconButton>
              <Link
                to={{
                  pathname: "/logout",
                }}
              >
                <button className="button-29">خروج</button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
