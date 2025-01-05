import { Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/page";
import SingUp from "../pages/signup/page";

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<SingUp />} />
        </Routes>
    );
};

export default RoutesMain;