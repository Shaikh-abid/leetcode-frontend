import axiosInstance from "../lib/axiosInstance";

const createPlaylist = async (playlistData) => {
  try {
    const response = await axiosInstance.post(
      "/api/playlists/create-playlist",
      playlistData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserPlaylists = async () => {
  try {
    const response = await axiosInstance.get("/api/playlists/get-playlists");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addProblemToPlaylist = async (playlistId, problemId) => {
  try {
    const response = await axiosInstance.post("/api/playlists/add-problem", {
      playlistId,
      problemId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeProblemFromPlaylist = async (playlistId, problemId) => {
  try {
    const response = await axiosInstance.post("/api/playlists/remove-problem", {
      playlistId,
      problemId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePlaylist = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(
      "/api/playlists/delete-playlist",
      { data: { playlistId } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const PlaylistService = {
  createPlaylist,
  getUserPlaylists,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
  deletePlaylist,
};

export default PlaylistService;
