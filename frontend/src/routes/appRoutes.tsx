import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
 import Register from "@/pages/auth/register"
import Home from "@/pages/home/home"
import PrivateRoutes from "./privateRoutes"
import Team from "@/pages/team/team"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoutes/>}>
                <Route path="/team" element={<Team />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
