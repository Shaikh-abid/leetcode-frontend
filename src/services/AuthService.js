import axiosInstance from "../lib/axiosInstance";

const RegisterService = async (data) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const LoginService = async (data) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GoogleLoginService = async (data) => {
  try {
    const response = await axiosInstance.get("/api/auth/google", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Google redirects back here
const GoogleAfterLoginService = async (data) => {
  try {
    const response = await axiosInstance.get("/api/auth/google/callback", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const LogoutService = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUserProfileInfoService = async (data) => {
  try {
    const response = await axiosInstance.put("/api/auth/update-profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  RegisterService,
  LoginService,
  GoogleLoginService,
  GoogleAfterLoginService,
  LogoutService,
  updateUserProfileInfoService,
};

export default AuthService;
