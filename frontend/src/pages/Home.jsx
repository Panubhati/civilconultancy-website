import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Building2,
    Clock3,
    Crosshair,
    Lightbulb,
    PencilRuler,
    ShieldCheck,
    Target,
    Wifi,
} from "lucide-react";
import "./Home.css";

const headlineStats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "15+", label: "Technical Experts" },
    { value: "96%", label: "On-Time Handover Rate" },
];

const aboutPrinciples = [
    {
        title: "Our Vision",
        description: "To empower businesses worldwide through talent and passion.",
        icon: Target,
    },
    {
        title: "Our Mission",
        description:
            "Enduring partnerships that enable continuous growth for our customers, team members, and other stakeholders.",
        icon: ShieldCheck,
    },
    {
        title: "Our Philosophy",
        description: "GROW TOGETHER",
        icon: Lightbulb,
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
        title: "Review and Execution Consultation",
        description:
            "We present the designs for your feedback, make revisions, and guide you with consultation during execution.",
    },
    {
        step: "04",
        title: "Delivery and Post-Delivery Consultation",
        description:
            "Receive complete working drawings ready for construction, with post-delivery consultation support.",
    },
];

const planImageFallbacks = ["/dist/plan.png", "/plan.png", "/site.png"];

function Home() {
    const navigate = useNavigate();

    const handlePlanImageError = (event) => {
        const image = event.currentTarget;
        const currentIndex = Number(image.dataset.fallbackIndex || 0);
        const nextIndex = currentIndex + 1;

        if (nextIndex < planImageFallbacks.length) {
            image.dataset.fallbackIndex = String(nextIndex);
            image.src = planImageFallbacks[nextIndex];
        }
    };

    useEffect(() => {
        const revealItems = document.querySelectorAll(".home-v2-reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("home-v2-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
        );

        revealItems.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="home-v2">
            <section className="home-v2-hero">
                <div className="home-v2-hero-grid">
                    <div className="home-v2-hero-copy">
                        <h1>
                            Welcome to the
                            <span className="home-v2-company-line">Anita Construction and Consultancy</span>
                        </h1>
                        <p className="home-v2-subtitle">
                            Anita Construction helps developers and property owners move from
                            concept to completion with disciplined design, technical planning,
                            and site-level accountability.
                        </p>
                        <div className="home-v2-actions">
                            <button
                                type="button"
                                className="home-v2-btn home-v2-btn-primary"
                                onClick={() => navigate("/services")}
                            >
                                Explore Services
                                <ArrowRight size={18} />
                            </button>
                            <button
                                type="button"
                                className="home-v2-btn home-v2-btn-secondary"
                                onClick={() => navigate("/contact")}
                            >
                                Book Consultation
                            </button>
                        </div>
                        <div className="home-v2-stat-grid">
                            {headlineStats.map((item) => (
                                <article key={item.label} className="home-v2-stat-card">
                                    <span className="home-v2-stat-value">{item.value}</span>
                                    <span className="home-v2-stat-label">{item.label}</span>
                                </article>
                            ))}
                        </div>
                    </div>

                   
                </div>
            </section>

            <section className="home-v2-about home-v2-reveal">
                <div className="home-v2-section-head">
                    <p>Know About Us</p>
                    <h2>Engineering the Future Through Inspired Design.</h2>
                </div>
               
                <div className="home-v2-about-grid">
                    {aboutPrinciples.map((item) => (
                        <article key={item.title} className="home-v2-about-card home-v2-reveal">
                            <div className="home-v2-about-icon">
                                <item.icon size={20} />
                            </div>
                            <p className="home-v2-about-label">{item.label}</p>
                            <h3>{item.title}</h3>
                            <p className="home-v2-about-description">{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-v2-reasons home-v2-reveal">
                <div className="home-v2-section-head">
                    <p>Why Choose Us</p>
                    <h2>Reasons to work with Anita Construction</h2>
                </div>
                <div className="home-v2-reasons-list">
                    {reasonsToBuy.map((item, index) => (
                        <article key={item.title} className="home-v2-reason-card home-v2-reveal">
                            <span className="home-v2-reason-number">0{index + 1}</span>
                            <div className="home-v2-reason-icon">
                                <item.icon size={22} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-v2-service-lanes home-v2-reveal">
                <div className="home-v2-section-head">
                    <p>What We Handle</p>
                    <h2>Technical expertise built for on-site realities</h2>
                </div>
                <div className="home-v2-lanes-grid">
                    {serviceLanes.map((lane) => (
                        <article key={lane.title} className="home-v2-lane-card home-v2-reveal">
                            <div className="home-v2-lane-icon">
                                <lane.icon size={24} />
                            </div>
                            <h3>{lane.title}</h3>
                            <p>{lane.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-v2-workflow home-v2-reveal">
                <div className="home-v2-workflow-head">
                    <p className="home-v2-flow-tag">How We Work</p>
                    <h2>A clear 4-step process from idea to final drawings</h2>
                </div>
                <div className="home-v2-flow-grid">
                    {workflowSteps.map((step) => (
                        <article key={step.step} className="home-v2-flow-card home-v2-reveal">
                            <span className="home-v2-flow-step">{step.step}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-v2-cta home-v2-reveal">
                <div className="home-v2-cta-content home-v2-reveal">
                    <h2>Need an engineering partner who stays accountable on ground?</h2>
                    <p>
                        Share your project requirements and we will map out the right design
                        and execution strategy.
                    </p>
                    <button
                        type="button"
                        className="home-v2-btn home-v2-btn-primary"
                        onClick={() => navigate("/contact")}
                    >
                        Start Your Project Discussion
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;
