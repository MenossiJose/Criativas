import { Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/page";
import SingUp from "../pages/signup/page";
import LandingPage from "../pages/landingPage/page";

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/landing" element={<LandingPage />} />
        </Routes>
    );
};

export default RoutesMain;