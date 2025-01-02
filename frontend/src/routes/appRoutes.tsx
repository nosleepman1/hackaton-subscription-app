import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
import Register from "@/pages/auth/register"
import Home from "@/pages/home/home"
import PrivateRoutes from "./privateRoutes"
import AdminRoutes from "./adminRoutes"
import Team from "@/pages/team/team"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import Profile from "@/pages/profile/profile"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoutes />}>
                <Route path="/team" element={<Team />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
