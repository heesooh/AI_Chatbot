import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status! == 200) {
    throw new Error("Unable to login");
  }
  const data = response.data;
  return data;
};

export const checkAuthStatus = async () => {
    const response = await axios.get("/user/auth-status");
    if (response.status !== 200) {
        console.log("Failed to authenticate!")
        throw new Error("Unable to authenticate!");
    }
    const data = response.data;
    return data;
  };