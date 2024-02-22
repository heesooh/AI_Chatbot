import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true
});

export const signupUser = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post("/user/signup", { name, email, password });
  if (response.status !== 201) {
    throw new Error("Unable to singup");
  }
  const data = response.data;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/user/login", { email, password });
  if (response.status !== 201) {
    throw new Error("Unable to login");
  }
  const data = response.data;
  return data;
};

export const checkAuthStatus = async () => {
  const response = await axiosInstance.get("/user/auth-status");
  if (response.status !== 200) {
    console.log("Failed to authenticate!");
    throw new Error("Unable to authenticate!");
  }
  const data = response.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const response = await axiosInstance.post("/chat/new", {message});
  if (response.status !== 200) {
    console.log("Failed to send chat!");
    throw new Error("Unable to send chat!");
  }
  const data = response.data;
  return data;
};

export const getUserChats = async () => {
  const response = await axiosInstance.get("/chat/all-chats");
  if (response.status !== 200) {
    console.log("Failed to fetch chats!");
    throw new Error("Unable to fetch chats!");
  }
  const data = response.data;
  return data;
};

export const deleteChats = async () => {
  const response = await axiosInstance.delete("/chat/delete");
  if (response.status !== 200) {
    console.log("Failed to delete chats!");
    throw new Error("Unable to delete chats!");
  }
  const data = response.data;
  return data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get("/user/logout");
  if (response.status !== 200) {
    console.log("Failed to logout!");
    throw new Error("Unable to logout!");
  }
  const data = response.data;
  return data;
};