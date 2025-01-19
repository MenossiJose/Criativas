import { Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/page";
import SingUp from "../pages/signup/page";
import LandingPage from "../pages/landingPage/page";
import Home from "../pages/home/page";
import Profile from "../pages/profile/page";
import Idea from "../pages/ideas/page";

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/idea" element={<Idea />} />
        </Routes>
    );
};

export default RoutesMain;