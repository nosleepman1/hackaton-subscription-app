import Navbar from "@/components/navbar";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Team from "@/pages/team";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
