import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div
            style={{
                gap: "15px",
                display: "flex",
                marginRight: 'auto',
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Link to={"/"}>
                <img
                    src="openai.png"
                    alt="openai"
                    width={"30px"}
                    height={"30px"}
                    className="image-inverted"
                />
            </Link>
            <Typography
                sx={{
                    display: { md: "block", sm: "none", xs: "none" }, // Hide title on small screen
                    mr: "auto", // marginRight
                    fontWeight: "800",
                    textShadow: "2px 2px 20px #000",
                }}
            >
                <span style={{ fontSize: "20px" }}>MERN-GPT</span>
            </Typography>
        </div>
    );
};

export default Logo;