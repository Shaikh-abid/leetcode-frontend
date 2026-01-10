import axiosInstance from "../lib/axiosInstance";

const getProblem = async () => {
  try {
    const response = await axiosInstance.get("/api/problems");
    return response.data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

const createProblem = async (problemData) => {
  try {
    const response = await axiosInstance.post("/api/problems", problemData);
    return response.data;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  }
};

const getProblemBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(
      `/api/problems/getProblemBySlug?slug=${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching problem by slug:", error);
    throw error;
  }
};

const ProblemService = {
  getProblem,
  createProblem,
  getProblemBySlug,
};

export default ProblemService;
