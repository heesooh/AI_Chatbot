import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
    toast.loading("Logging Out...", { id: "logout" });
    if (auth?.isLoggedIn) {
        auth.logout();
        toast.success("Logging Out...", { id: "logout" });
        navigate("/");
    } else {
      toast.error("Failed to Logout", { id: "logout" });
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
          <label style={{fontSize:"18px"}}>Are ou sure you want to logout?</label>
          <div>
            <button style={{marginTop: "10px", marginRight: "15px"}} className="header-btn" onClick={handleClick}>Cancle</button>
            <button className="header-btn" onClick={handleLogout}>Logout</button>
          </div>
        </PopupBody>
      </BasePopup>
    </div>
  );
}

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin-top: 8px;
  border-radius: 8px;
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'gill sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
  color: whtie;
  diplay: flex;
  justify-contents: center;
  align-items: center;
  background: rgb(19,34,62);
  box-shadow: 4px 4px 0 0 rgba(124, 46, 214, 0.827);
  border: 2px solid rgb(133, 84, 182);
`
);
