
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // check auth on refresh
    const [error, setError] = useState(null);


    // 1. Check if user is already logged in (Persist User)
    useEffect(() => {
        // For a simple resume project, we can store the basic user info in localStorage
        // ideally, you'd hit an endpoint like /api/auth/me here using the cookie
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

            // Save user to state
            setUser(data.user);

            // Save to local storage (so they stay logged in on refresh)
            localStorage.setItem("user", JSON.stringify(data.user));

            // If your backend returns an accessToken, you might want to store it too
            // localStorage.setItem("token", data.accessToken); 

            navigate("/problems"); // Redirect to problems page
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
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
            // Usually, after register, we redirect to login or auto-login
            navigate("/auth/login");
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
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
            // localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // 5. Google Login Trigger
    const googleLogin = () => {
        // We do NOT use axios for this. We must redirect the browser window.
        // The AuthService.GoogleLoginService isn't needed here strictly.
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            logout,
            googleLogin,
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

