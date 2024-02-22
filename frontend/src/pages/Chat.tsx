import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicators";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: string;
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully Loaded Chats", { id: "loadchats" });
          // Scroll to the bottom after loading chats
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to load chats", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteChats();
      setChatMessages([]);
      toast.success("Successfully deleted all chats", { id: "deletechats" });
    } catch (error) {
      toast.error("Failed to delete chats", { id: "deletechats" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      {/* Left Container */}
      <Box sx={{ display: { md: "felex", xs: "none", sm: "none" } }}>
        <div className="chat-leftContainer">
          <div className="chat-leftContainerCircle"></div>
          <div className="chat-leftContainerCircle"></div>
          <div className="chat-leftContainerInner">
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Avatar
                sx={{
                  mx: "auto",
                  my: 3,
                  mt: "30px",
                  padding: "10px",
                  fontSize: "px",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 700,
                }}
              >
                {auth?.user?.name.includes(" ") ? (
                  <div>
                    {auth?.user?.name[0]}
                    {auth?.user?.name.split(" ")[1][0]}
                  </div>
                ) : (
                  <div>{auth?.user?.name[0]}</div>
                )}
              </Avatar>
              <div style={{ width: "90%", marginLeft: "10px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label>Welcome {auth?.user?.name}!</label>
                </div>
                <Typography sx={{ mx: "auto", textAlign: "center" }}>
                  Experience the GPT 3.5 Turbo Chat! This cutting-edge chat
                  system utilizes OpenAI's powerful GPT 3.5 API to swiftly
                  provide reliable responses. Enjoy real-time interaction with
                  enhanced language understanding, extensive knowledge coverage,
                  and refined fine-tuning capabilities. With a larger model size
                  and thorough training, GPT 3.5 ensures accuracy and relevance
                  in its responses. Benefit from quicker response times,
                  optimized performance, and advanced features tailored to
                  diverse applications. Engage with confidence and efficiency
                  using the GPT 3.5 Turbo Chat!
                </Typography>
              </div>
              <button className="chatDelete-btn" onClick={handleDeleteChats}>
                <span className="chatDelete-btn-text">DELETE CHAT</span>
                <span className="chatDelete-btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
              </button>
              {/* <Button
                onClick={handleDeleteChats}
                sx={{
                  width: "80%",
                  my: "auto",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: 3,
                  mx: "auto",
                  bgcolor: red[300],
                  ":hover": {
                    bgcolor: red.A400,
                  },
                }}
              >
                Clear Conversation
              </Button> */}
            </Box>
          </div>
        </div>
      </Box>
      {/* <Box
        sx={{
          display: { md: "felex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          mt: 9,
        }}
      >
        
      </Box> */}
      {/* Right Chat Container */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 1, sx: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <div className="chat-header">
          <Typography
            sx={{
              fontSize: "40px",
              color: "white",
              mb: 2,
              mx: "auto",
              fontWeight: 600,
            }}
          >
            Model - GPT 3.5 Turbo
          </Typography>
        </div>

        <div
          className="chat-container"
          ref={chatContainerRef}
          style={{
            height: "60vh",
            borderRadius: 3,
            overflow: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </div>
        <div
          style={{
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderBottomLeftRadius: "10px",
            // borderBottomRightRadius: "10px",
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here..."
            className="chat-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              ml: "auto",
              color: "white",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
