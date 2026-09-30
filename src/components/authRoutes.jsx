import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRoutes() {
    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        return (
            <Navigate
                to={location.state?.from?.pathname || "/"}
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
}