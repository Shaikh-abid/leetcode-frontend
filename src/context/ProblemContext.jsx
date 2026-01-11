import React, { createContext, useContext, useState } from 'react';
import ProblemService from '../services/ProblemService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ProblemContext = createContext()

const ProblemContextProvider = ({ children }) => {
    const [problems, setProblems] = useState([]); // List of all problems
    const [currentProblem, setCurrentProblem] = useState(null); // The specific problem user is solving
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 1. Fetch All Problems (For the list page)
    const fetchAllProblems = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProblemService.getProblem();
            setProblems(data);

            navigate('/problems');
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch problems");
            toast.error("Failed to fetch problems");
        } finally {
            setLoading(false);
        }
    };


    // 2. Fetch Single Problem (For the solve page)
    const fetchProblem = async (slug) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProblemService.getProblemBySlug(slug);
            setCurrentProblem(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch problem");
            toast.error("Failed to fetch problem");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 3. Create Problem (For the create page)
    const addProblem = async (problemData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProblemService.createProblem(problemData);
            // Optionally add to local state immediately so we don't need to refetch
            setProblems((prev) => [...prev, data.data]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create problem");
            toast.error("Failed to create problem");
            throw err; // Re-throw so the UI component can handle the specific error (e.g., toast)
        } finally {
            setLoading(false);
        }
    };


    const runUserCode = async (language, code, slug) => {
        setLoading(true); // Maybe use a separate 'executing' state so UI doesn't disappear
        try {
            const result = await ProblemService.submitSolution({ language, code, slug });
            return result; // Returns { success: true, results: [...] }
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const finalSubmit = async (language, code, slug) => {
        setLoading(true); // Maybe use a separate 'executing' state so UI doesn't disappear
        try {
            const result = await ProblemService.finalSubmitSolution({ language, code, slug });
            return result; // Returns { success: true, results: [...] }
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return (
        <ProblemContext.Provider
            value={{
                problems,
                currentProblem,
                loading,
                error,
                fetchAllProblems,
                fetchProblem,
                addProblem,
                runUserCode,
                finalSubmit
            }}>
            {children}
        </ProblemContext.Provider>
    )
}

// Custom Hook for easier usage
export const useProblem = () => {
    const context = useContext(ProblemContext);
    if (!context) {
        throw new Error("useProblem must be used within a ProblemContextProvider");
    }
    return context;
};

export default ProblemContextProvider