import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
 import Register from "@/pages/auth/register"
import Home from "@/pages/home/home"
import PrivateRoutes from "./privateRoutes"


const AppRoutes = () => {
    return (
        <Routes>

        {/* <Route element={<PrivateRoutes/>}> */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/resources" element={<Resources />} /> */}
        {/* </Route> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
