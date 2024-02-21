import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData= new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      try {
        toast.loading("Signing In...", {id:"singup"});
        await auth?.signup(name, email, password);
        toast.success("Singup Success", {id:"singup"});
      } catch (error) {
        console.error(error);
        toast.error("Failed to signup", {id:"singup"});
      }
  }

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  },[auth])

  return (
    <div className="slide-top">
      <Box width={"100%"} height={"100%"}>
        <Box
          display={"flex"}
          flex={{ xs: 1, md: 0.5 }}
          justifyContent={"center"}
          alignItems={"center"}
          padding={2}
          ml={"auto"}
          mt={56}
        >
          <div className="e-card playing" style={{  width: "550px", height: "500px"}}>
            <div className="wave"></div>
            <div className="wave"style={{
              width: "700px",
              height: "700px"
            }}></div>
            <div className="wave"></div>
            <form
              onSubmit={handleSubmit}
              style={{
                position: "absolute",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  padding={2}
                  fontWeight={600}
                >
                  SGINUP
                </Typography>
                <CustomizedInput type="text" name="name" label="Name" />
                <CustomizedInput type="email" name="email" label="Email" />
                <CustomizedInput
                  type="password"
                  name="password"
                  label="Password"
                />
                <button className="btn" type="submit">
                  <svg
                    className="svgIcon"
                    viewBox="0 0 512 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                  </svg>
                  Explore
                </button>
              </Box>
            </form>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
