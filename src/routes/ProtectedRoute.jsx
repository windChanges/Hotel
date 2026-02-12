import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("USER_ADMIN");

    useEffect(() => {
        if (!userStr) {
            navigate("/auth/login");
            return;
        }

        const user = JSON.parse(userStr);

        // Check role if required
        if (requiredRole && user.user.role !== requiredRole) {
            // If user is not admin but tries to access admin, redirect to home or unauthorized page
            // For now redirect to home
            alert("You do not have permission to access this page.");
            navigate("/");
        }
    }, [userStr, navigate, requiredRole]);

    // If no user, it will redirect, but we might render nothing or a loading state briefly
    if (!userStr) return null;

    return children;
};

export default ProtectedRoute;
