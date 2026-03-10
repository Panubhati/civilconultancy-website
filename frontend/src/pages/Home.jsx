import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Building2,
    ChevronDown,
    Clock3,
    Crosshair,
    Lightbulb,
    PencilRuler,
    ShieldCheck,
    Target,
    Wifi,
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";
import axios from "axios";
import "./Home.css";

/* ── Data ─────────────────────────────────────────────── */

const headlineStats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "15+", label: "Technical Experts" },
    { value: "96%", label: "On-Time Handover" },
];

const aboutPrinciples = [
    {
        title: "Our Vision",
        description: "To empower businesses worldwide through talent and passion.",
        icon: Target,
        colorClass: "home-icon-orange",
    },
    {
        title: "Our Mission",
        description:
            "Enduring partnerships that enable continuous growth for our customers, team members, and other stakeholders.",
        icon: ShieldCheck,
        colorClass: "home-icon-blue",
    },
    {
        title: "Our Philosophy",
        description: "GROW TOGETHER",
        icon: Lightbulb,
        colorClass: "home-icon-navy",
    },
];

const serviceLanes = [
    {
        icon: Building2,
        title: "Structural Planning",
        description:
            "Detailed structural layouts and calculations built for durability and fast execution.",
    },
    {
        icon: Target,
        title: "Project Control",
        description:
            "Schedules, cost checkpoints, and execution tracking to keep every phase predictable.",
    },
    {
        icon: ShieldCheck,
        title: "Site Compliance",
        description:
            "Supervision with quality checks, code compliance, and safety-first field decisions.",
    },
];

const reasonsToBuy = [
    {
        icon: PencilRuler,
        title: "100% Customised Design",
        description:
            "House plans are custom made for your plot size, space needs, and lifestyle goals.",
    },
    {
        icon: Clock3,
        title: "Time Saving",
        description:
            "Our streamlined planning approach reduces design delays and speeds up project execution.",
    },
    {
        icon: Wifi,
        title: "No Engineer Visit Required",
        description:
            "Get detailed online support from concept to construction without repeated site meetings.",
    },
    {
        icon: Crosshair,
        title: "High Accuracy Drawing",
        description:
            "Every drawing is cross-checked with practical dimensions for precise and build-ready output.",
    },
];

const workflowSteps = [
    {
        step: "01",
        title: "Consultation",
        description:
            "Share your requirements, plot dimensions, and design preferences with our team.",
    },
    {
        step: "02",
        title: "Design",
        description:
            "Our experts create customized floor plans and elevations based on your inputs.",
    },
    {
        step: "03",
        title: "Review & Execution",
        description:
            "We present the designs for your feedback, make revisions, and guide you during execution.",
    },
    {
        step: "04",
        title: "Delivery & Support",
        description:
            "Receive complete working drawings ready for construction, with post-delivery consultation support.",
    },
];

const faqData = [
    {
        question: "What services does Anita Construction provide?",
        answer: "We offer comprehensive civil engineering and construction consultancy services including structural planning, architectural design, project management, site supervision, and compliance verification. Our services cover both residential and commercial projects.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on scope and complexity. A standard residential design takes 2–4 weeks, while larger commercial projects may require 6–12 weeks. We provide a detailed timeline during the initial consultation.",
    },
    {
        question: "Do you provide on-site supervision?",
        answer: "Yes, we offer full on-site supervision services. Our team conducts regular quality checks, ensures code compliance, and makes safety-first field decisions throughout the construction process.",
    },
    {
        question: "What areas do you serve?",
        answer: "We primarily serve clients across India, with the ability to provide remote design and consultation services nationwide. Our online support model means you can access our expertise from anywhere.",
    },
    {
        question: "How do I get started with a consultation?",
        answer: "Simply fill out the contact form on our website or call us directly. We'll schedule a free initial consultation to understand your requirements, discuss your vision, and provide a clear roadmap for your project.",
    },
    {
        question: "What is included in the design package?",
        answer: "Our design packages include floor plans, structural drawings, elevation designs, cross-sections, and detailed specifications. Every drawing is cross-checked for accuracy and is completely build-ready.",
    },
];

/* ── Component ────────────────────────────────────────── */

function Home() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    const dismissToast = useCallback(() => setToast(null), []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(dismissToast, 5000);
            return () => clearTimeout(timer);
        }
    }, [toast, dismissToast]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Name is required.");
            return false;
        }
        if (!formData.phone.trim()) {
            setError("Phone number is required.");
            return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            setError("Please enter a valid 10-digit phone number.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        try {
            await axios.post(
                "https://civilconultancy-website.onrender.com/api/consultation",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            setToast({
                type: "success",
                message: "Consultation booked successfully! We will contact you soon.",
            });
            setFormData({ name: "", phone: "", city: "" });
        } catch (err) {
            console.error("Error submitting consultation:", err);
            let msg = "An unexpected error occurred. Please try again.";
            if (err.response) {
                msg = err.response.data.error || "Failed to book consultation.";
            } else if (err.request) {
                msg = "Network error. Please check your connection.";
            }
            setToast({ type: "error", message: msg });
        } finally {
            setLoading(false);
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="home-page">
            {/* ── HERO WITH BACKGROUND IMAGE ─────────────── */}
            <section className="home-hero">
                <div className="home-hero-inner">
                    <div className="home-hero-copy">
                        <p className="home-kicker">Civil Engineering Consultancy</p>
                        <h1>
                            Welcome to{" "}
                            <span className="home-highlight">Anita Construction</span>
                            <br />
                            and Consultancy
                        </h1>
                        <p className="home-subtitle">
                            Anita Construction helps developers and property owners move from
                            concept to completion with disciplined design, technical planning,
                            and site-level accountability.
                        </p>
                        <div className="home-actions">
                            <button
                                type="button"
                                className="home-btn home-btn-primary"
                                onClick={() => navigate("/services")}
                            >
                                Explore Services
                                <ArrowRight size={17} />
                            </button>
                            <button
                                type="button"
                                className="home-btn home-btn-secondary"
                                onClick={() => navigate("/contact")}
                            >
                                Book Consultation
                            </button>
                        </div>
                        <div className="home-stat-row">
                            {headlineStats.map((stat, i) => (
                                <>
                                    {i > 0 && <div className="home-stat-divider" key={`d-${i}`} />}
                                    <div key={stat.label} className="home-stat-item">
                                        <span className="home-stat-value">{stat.value}</span>
                                        <span className="home-stat-label">{stat.label}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="home-hero-form">
                        <h3>Talk to Our Expert</h3>
                        <p className="home-form-tagline">
                            Get a free consultation for your project
                        </p>

                        {error && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: "0.8rem", textAlign: "left", fontWeight: "600" }}>{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <div className="home-form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="home-form-input"
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="home-form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="home-form-input"
                                    placeholder="Phone Number *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="\d{10}"
                                    title="Please enter a valid 10-digit phone number"
                                />
                            </div>
                            <div className="home-form-group">
                                <input
                                    type="text"
                                    name="city"
                                    className="home-form-input"
                                    placeholder="Your City / Location"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="home-form-btn" disabled={loading}>
                                {loading ? "Booking..." : "Book Free Consultation"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ── ABOUT / KNOW ABOUT US ──────────────────── */}
            <section className="home-section">
                <div className="home-section-head">
                    <p className="home-section-tag">Know About Us</p>
                    <h2>Engineering the Future Through Inspired Design</h2>
                </div>
                <div className="home-about-grid">
                    {aboutPrinciples.map((item) => (
                        <article key={item.title} className="home-about-card">
                            <div className={`home-icon-wrap ${item.colorClass}`}>
                                <item.icon size={22} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ── WHY CHOOSE US / REASONS ────────────────── */}
            <div className="home-section-alt">
                <section className="home-section">
                    <div className="home-section-head">
                        <p className="home-section-tag">Why Choose Us</p>
                        <h2>Reasons to work with Anita Construction</h2>
                    </div>
                    <div className="home-reasons-grid">
                        {reasonsToBuy.map((item, index) => (
                            <article key={item.title} className="home-reason-card">
                                <span className="home-reason-num">0{index + 1}</span>
                                <div className="home-reason-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>

            {/* ── SERVICES / WHAT WE HANDLE ──────────────── */}
            <section className="home-section">
                <div className="home-section-head">
                    <p className="home-section-tag">What We Handle</p>
                    <h2>Technical expertise built for on-site realities</h2>
                </div>
                <div className="home-services-grid">
                    {serviceLanes.map((lane) => (
                        <article key={lane.title} className="home-service-card">
                            <div className="home-icon-wrap home-icon-blue">
                                <lane.icon size={22} />
                            </div>
                            <h3>{lane.title}</h3>
                            <p>{lane.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ── HOW WE WORK ────────────────────────────── */}
            <section className="home-process-section">
                <div className="home-process-container">
                    <div className="home-process-head">
                        <p className="home-section-tag">How We Work</p>
                        <h2>A clear 4-step process from idea to final drawings</h2>
                    </div>
                    <div className="home-process-grid">
                        {workflowSteps.map((step) => (
                            <article key={step.step} className="home-process-card">
                                <span className="home-step-index">{step.step}</span>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section className="home-section">
                <div className="home-section-head">
                    <p className="home-section-tag">FAQ</p>
                    <h2>Frequently Asked Questions</h2>
                    <p className="home-section-desc">
                        Find answers to common questions about our services and process.
                    </p>
                </div>

                <div className="home-faq-list">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`home-faq-item ${openFaq === index ? "home-faq-open" : ""}`}
                        >
                            <button
                                type="button"
                                className="home-faq-question"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaq === index}
                            >
                                <span>{item.question}</span>
                                <ChevronDown size={20} className="home-faq-chevron" />
                            </button>
                            <div className="home-faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────── */}
            <section className="home-cta">
                <div className="home-cta-box">
                    <h2>
                        Need an engineering partner who stays accountable on ground?
                    </h2>
                    <p>
                        Share your project requirements and we will map out the right design
                        and execution strategy.
                    </p>
                    <button
                        type="button"
                        className="home-btn home-btn-primary"
                        onClick={() => navigate("/contact")}
                    >
                        Start Your Project Discussion
                        <ArrowRight size={17} />
                    </button>
                </div>
            </section>

            {/* Toast Notification */}
            {toast && (
                <div className={`home-toast home-toast-${toast.type}`}>
                    <div className="home-toast-icon">
                        {toast.type === "success" ? (
                            <CheckCircle2 size={22} />
                        ) : (
                            <AlertCircle size={22} />
                        )}
                    </div>
                    <div className="home-toast-body">
                        <strong>{toast.type === "success" ? "Success!" : "Error"}</strong>
                        <p>{toast.message}</p>
                    </div>
                    <button
                        type="button"
                        className="home-toast-close"
                        onClick={dismissToast}
                        aria-label="Close notification"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </main>
    );
}

export default Home;
