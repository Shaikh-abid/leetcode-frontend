import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Use 'next/navigation' if using Next.js
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth(); // We need to expose setUser in Context (see note below) or use a login helper

    useEffect(() => {
        const token = searchParams.get("token");
        const userString = searchParams.get("user");

        if (token && userString) {
            try {
                const user = JSON.parse(decodeURIComponent(userString));

                // 1. Save to Local Storage
                localStorage.setItem("token", token); // Save Access Token
                localStorage.setItem("user", JSON.stringify(user)); // Save User Details

                // 2. Update Context State (Force reload or set state)
                // If your useAuth doesn't export setUser, a window.location.reload() is a quick hack
                // But better to add setUser to your AuthContext values.
                window.location.href = "/problems"; // Redirect to main app

            } catch (error) {
                console.error("Failed to parse user data", error);
                navigate("/auth/login");
            }
        } else {
            navigate("/auth/login");
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <h2 className="mt-4 text-lg font-medium">Logging you in...</h2>
        </div>
    );
}