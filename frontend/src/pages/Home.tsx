import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DatabaseAnimation from "../components/homeAnimation/DatabaseAnimation";
import AIAnimation from "../components/homeAnimation/AIAnimation";
import UIAnimation from "../components/homeAnimation/UIAnimation";

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = async () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="home-top">
        <Box
          sx={{
            width: "45%",
            height: "45%",
            display: { md: "felex", xs: "none", sm: "none" },
          }}
        >
          <video
            src="demo.mp4"
            autoPlay
            loop
            muted
            style={{ border: "2px solid white" }}
          />
        </Box>
        <div className="home-top-text">
          <span style={{ fontSize: "80px", fontWeight: "700" }}>MERN-GPT</span>
          <span style={{ fontSize: "30px", fontWeight: "600" }}>
            Chat with GPT-3.5 Turbo
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Made by Heesoo Hwang
          </span>
          <button className="home-top-btn" onClick={handleGetStarted}>
            <span>GET STARTED</span>
          </button>
        </div>
      </div>
      <div className="home-center">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <div className="home-card">
            <div className="home-card-info">
              <div className="home-card-animation">
                <AIAnimation />
              </div>
              <p className="home-card-title">Advanced AI Chatbot Integration</p>
              <div className="home-card-text">
                <span>
                  The application utilizes cutting-edge OpenAI API's GPT 3.5 turbo
                  to power an AI chatbot capable of engaging users in real-time
                  conversations, offering personalized responses, and continuously
                  learning from interactions, showcasing sophisticated AI
                  integration.
                </span>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="home-card-info">
              <div className="home-card-animation">
                <DatabaseAnimation/>
              </div>
              <p className="home-card-title">Seamless Database Integration</p>
              <div className="home-card-text">
                <span>
                  With MongoDB as the backend, our application efficiently stores
                  user conversations, allowing for easy retrieval, management, and
                  deletion of chats, ensuring a seamless user experience and data
                  management capabilities.
                </span>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="home-card-info">
              <div className="home-card-animation">
                <UIAnimation />
              </div>
              <p className="home-card-title">Robust UI Flexibility</p>
              <div className="home-card-text">
                <span>
                  The UI is designed with versatility in mind, capable of displaying
                  rich content including code blocks, providing users with a
                  visually appealing and interactive experience, demonstrating
                  proficiency in front-end development and user interface design.
                </span>
              </div>
            </div>
          </div>
        </Box>
      </div>
      <div className="home-bottom"></div>
      <div className="home-profile"></div>
    </div>
  );
};

export default Home;
