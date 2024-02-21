import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
    if (auth?.isLoggedIn) {
        auth.logout();
        navigate("/");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button className="header-btn" type="button" onClick={handleClick}>LOGOUT</button>
      <BasePopup id={id} open={open} anchor={anchor} placement={"bottom-end"}>
        <PopupBody>
          <label>Are ou sure you want to logout?</label>
          <div>
            <button onClick={handleClick}>Cancle</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </PopupBody>
      </BasePopup>
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'gill sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
  color: black;
  diplay: flex;
  justify-contents: center;
  align-items: center;
`
);
