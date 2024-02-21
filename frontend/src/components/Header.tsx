import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import SimplePopup from "./shared/PopupButton";
import HeaderButton from "./shared/HeaderButton";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div style={{ display: "flex", justifyContent: "right" }}>
          {auth?.isLoggedIn ? (
            <>
              <HeaderButton nav="/" name="HOME" />
              <HeaderButton nav="/chat" name="AI-CHAT" />
              <SimplePopup />
            </>
          ) : (
            <>
              <HeaderButton nav="/" name="HOME" />
              <HeaderButton nav="/login" name="LOGIN" />
              <div style={{ marginRight: "-15px" }}>
                <HeaderButton nav="/signup" name="SIGNUP" />
              </div>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
