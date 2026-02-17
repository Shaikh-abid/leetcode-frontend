import axiosInstance from "../lib/axiosInstance";

const AIService = async (data) => {
  try {
    const response = await axiosInstance.post("/api/ai/review", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default AIService;
