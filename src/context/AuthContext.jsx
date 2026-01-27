import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AuthService from '../services/AuthService';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // check auth on refresh
    const [error, setError] = useState(null);


    // 1. Check if user is already logged in (Persist User)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 2. Login Action
    const login = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthService.LoginService(formData);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/problems");
            toast.success("Login successful");
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            toast.error(err.response?.data?.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 3. Register Action
    const register = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthService.RegisterService(formData);
            navigate("/login");
            toast.success("Registration successful");
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            toast.error(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 4. Logout Action
    const logout = async () => {
        try {
            await AuthService.LogoutService();
            setUser(null);
            localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // 5. Google Login Trigger
    const googleLogin = () => {
        window.location.href = "https://leetcode-backend-main.onrender.com/api/auth/google";
    };

    const updateUserProfileInfo = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthService.updateUserProfileInfoService(formData);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Profile update failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------------------------------------------
    // 👇 NEW FUNCTION: Manually update local state when problem is solved
    // ------------------------------------------------------------------
    const markProblemAsSolved = (problemId) => {
        if (!user) return;

        // Avoid duplicates if it's already there
        if (!user.solvedProblems.includes(problemId)) {
            const updatedUser = {
                ...user,
                solvedProblems: [...user.solvedProblems, problemId]
            };

            // Update State (triggers re-render)
            setUser(updatedUser);

            // Update LocalStorage (persists on reload)
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            error,
            login,
            register,
            logout,
            googleLogin,
            updateUserProfileInfo,
            markProblemAsSolved, // <--- Export the new function
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook for easier usage
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};