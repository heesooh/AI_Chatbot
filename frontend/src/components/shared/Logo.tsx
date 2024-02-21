import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={"/"} style={{
            gap: "15px",
            display: "flex",
            marginRight: 'auto',
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none"
        }}>
            <img
                src="openai.png"
                alt="openai"
                width={"30px"}
                height={"30px"}
                className="image-inverted"
            />
            <Typography
                sx={{
                    display: { md: "block", sm: "none", xs: "none" },
                    mr: "auto",
                    fontWeight: "700",
                    textShadow: "2px 2px 20px #000",
                }}
            >
                <span style={{ fontSize: "20px" }}>MERN-GPT</span>
            </Typography>

        </Link>
    );
};

export default Logo;