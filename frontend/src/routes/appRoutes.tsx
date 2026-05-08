import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
 import Register from "@/pages/auth/register"
import Home from "@/pages/home/home"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/resources" element={<Resources />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
