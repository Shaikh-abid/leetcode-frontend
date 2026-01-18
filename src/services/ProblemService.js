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
    return response.data.data;
  } catch (error) {
    console.error("Error fetching problem by slug:", error);
    throw error;
  }
};

const submitSolution = async (solutionData) => {
  try {
    const response = await axiosInstance.post(
      `/api/submissions/run`,
      solutionData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting solution:", error);
    throw error;
  }
};

const finalSubmitSolution = async (solutionData) => {
  try {
    const response = await axiosInstance.post(
      `/api/submissions/submit`,
      solutionData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting solution:", error);
    throw error;
  }
};

const getSubmissions = async (slug) => {
  try {
    const response = await axiosInstance.get(
      `/api/submissions/user-submissions?slug=${slug}`
    );
    return response.data; // returns { success: true, data: [...] }
  } catch (error) {
    throw error;
  }
};

const ProblemService = {
  getProblem,
  createProblem,
  getProblemBySlug,
  submitSolution,
  finalSubmitSolution,
  getSubmissions,
};

export default ProblemService;
