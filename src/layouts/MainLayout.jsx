import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrolltoTop from "../components/ScrolltoTop";
import ScrollTop from "../components/scrollTop";

const MainLayout = () => {

    return (
        <div className="bg-black min-h-screen">
            <ScrollTop />
            <Navbar />
            <Outlet />
            <Footer />
            <ScrolltoTop />
        </div>
    );
};

export default MainLayout;
