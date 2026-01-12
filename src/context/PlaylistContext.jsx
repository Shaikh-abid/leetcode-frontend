import React, { createContext, useContext, useState, useCallback } from "react";
import PlaylistService from "../services/PlaylistService";
import { toast } from "sonner";

const PlaylistContext = createContext();

export const PlaylistContextProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Fetch all playlists for the user
    const fetchPlaylists = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await PlaylistService.getUserPlaylists();
            // Assuming API returns { success: true, data: [...] }
            setPlaylists(response.data || []);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to fetch playlists";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Create a new playlist
    const createNewPlaylist = async (title, description) => {
        setLoading(true);
        try {
            const response = await PlaylistService.createPlaylist({ title, description });
            // Append the new playlist to the local state immediately
            setPlaylists((prev) => [response.data, ...prev]);
            toast.success("Playlist created successfully");
            return response;
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create playlist";
            toast.error(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 3. Add a problem to a playlist
    const addProblemToPlaylist = async (playlistId, problemId) => {
        try {
            const response = await PlaylistService.addProblemToPlaylist(playlistId, problemId);

            // Update the specific playlist in local state
            setPlaylists((prev) =>
                prev.map((p) => (p._id === playlistId ? response.data : p))
            );

            toast.success("Problem added to playlist");
            return response;
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to add problem";
            toast.error(msg);
            throw err;
        }
    };

    // 4. Remove a problem from a playlist
    const removeProblemFromPlaylist = async (playlistId, problemId) => {
        try {
            const response = await PlaylistService.removeProblemFromPlaylist(playlistId, problemId);

            // Update the specific playlist in local state
            setPlaylists((prev) =>
                prev.map((p) => (p._id === playlistId ? response.data : p))
            );

            toast.success("Problem removed from playlist");
            return response;
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to remove problem";
            toast.error(msg);
            throw err;
        }
    };

    // 5. Delete a playlist
    const removePlaylist = async (playlistId) => {
        // Optimistic update: Remove from UI immediately before API call finishes
        // (Optional: You can also do it after success, but this feels snappier)
        const previousPlaylists = [...playlists];
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId).data);

        try {
            await PlaylistService.deletePlaylist(playlistId);
            toast.success("Playlist deleted");
        } catch (err) {
            // Revert if API fails
            setPlaylists(previousPlaylists);
            const msg = err.response?.data?.message || "Failed to delete playlist";
            toast.error(msg);
            throw err;
        }
    };

    return (
        <PlaylistContext.Provider
            value={{
                playlists,
                loading,
                error,
                fetchPlaylists,
                createNewPlaylist,
                addProblemToPlaylist,
                removeProblemFromPlaylist,
                removePlaylist,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("usePlaylist must be used within a PlaylistContextProvider");
    }
    return context;
};