import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance"; // Make sure this path is correct
import { useAuth } from "../context/AuthContext"; // Import AuthContext to use setUser

export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth(); // We need to update Context directly
    const hasFetched = useRef(false); // Prevent double-firing in React StrictMode

    useEffect(() => {
        const code = searchParams.get("code");

        if (code && !hasFetched.current) {
            hasFetched.current = true; // Mark as running

            const exchangeToken = async () => {
                try {
                    // Call the new backend endpoint
                    const { data } = await axiosInstance.post("/api/auth/google-success", { code });

                    if (data.success) {
                        // 1. Save User Data
                        localStorage.setItem("user", JSON.stringify(data.user));

                        // 2. Update Context (so we don't need to reload page)
                        setUser(data.user);

                        // 3. Navigate to Problems
                        navigate("/problems");
                    }
                } catch (error) {
                    console.error("Google Login Failed:", error);
                    navigate("/login?error=FailedToExchange");
                }
            };

            exchangeToken();
        } else if (!code) {
            navigate("/login");
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <h2 className="mt-4 text-lg font-medium">Finalizing secure login...</h2>
        </div>
    );
}