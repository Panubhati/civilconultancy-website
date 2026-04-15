import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function AppLayout({ message }) {
    const { pathname } = useLocation();
    const isAdmin = pathname === "/admin";

    return (
        <>
            {!isAdmin && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            {!isAdmin && <Footer />}
            {!isAdmin && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}
        </>
    );
}

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((err) => console.error("Error connecting to backend:", err));
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <AppLayout message={message} />
        </Router>
    );
}

export default App;
