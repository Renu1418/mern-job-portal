import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "student") {
        return <Navigate to="/admin/companies" replace />;
    }

    return children;
};

export default StudentProtectedRoute;