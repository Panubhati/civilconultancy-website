import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Lightbulb,
    ShieldCheck,
    Target,
} from "lucide-react";
import "./About.css";

const stats = [
    { value: "2022", label: "Founded" },
    { value: "100+", label: "Projects Delivered" },
    { value: "15+", label: "Experts on Team" },
];

const milestones = [
    {
        year: "2021",
        title: "Technical Foundation",
        description:
            "The leadership journey started with focused civil engineering education and early practical site exposure.",
    },
    {
        year: "2022",
        title: "Firm Launch",
        description:
            "Anita Construction was established to deliver structural design, planning, and end-to-end construction support.",
    },
    {
        year: "2024",
        title: "Expanded Services",
        description:
            "The team grew into a multidisciplinary consultancy for design, supervision, project planning, and approvals.",
    },
];

const values = [
    {
        icon: Target,
        title: "Precision First",
        description:
            "Every drawing, estimate, and execution plan is engineered for accuracy and practical delivery.",
    },
    {
        icon: ShieldCheck,
        title: "Safety by Design",
        description:
            "Structural integrity and regulatory compliance are non-negotiable across all project stages.",
    },
    {
        icon: Lightbulb,
        title: "Smart Innovation",
        description:
            "We combine proven engineering principles with modern tools to improve speed and quality.",
    },
    {
        icon: Building2,
        title: "Long-Term Value",
        description:
            "Our solutions are built for durability, performance, and lifecycle efficiency.",
    },
];

const leaders = [
    {
        image: "/person1.png",
        name: "Yadnyeshwar Bhatikare",
        role: "Founder & CEO",
        specialty: "Structural Engineer",
    },
    {
        image: "/person2.png",
        name: "Pranav Bhatikare",
        role: "Co-Founder",
        specialty: "Computer Engineer",
    },
];

function AboutUs() {
    const navigate = useNavigate();

    return (
        <main className="aboutus-page">
            <section className="aboutus-hero">
                <div className="aboutus-hero-grid">
                    <div className="aboutus-hero-copy">
                        <p className="aboutus-kicker">About Anita Construction</p>
                        <h1 className="aboutus-title">
                            We design for strength.
                            <span>We build for generations.</span>
                        </h1>
                        <p className="aboutus-subtitle">
                            Anita Construction is a civil engineering consultancy focused on
                            clear planning, resilient structures, and dependable project
                            execution from concept to completion.
                        </p>
                        <div className="aboutus-actions">
                            <button
                                type="button"
                                className="aboutus-button aboutus-button-primary"
                                onClick={() => navigate("/contact")}
                            >
                                Start Your Project
                                <ArrowRight size={18} />
                            </button>
                            <button
                                type="button"
                                className="aboutus-button aboutus-button-secondary"
                                onClick={() => navigate("/projects")}
                            >
                                View Projects
                            </button>
                        </div>
                        <div className="aboutus-stat-grid">
                            {stats.map((item) => (
                                <article className="aboutus-stat-card" key={item.label}>
                                    <span className="aboutus-stat-value">{item.value}</span>
                                    <span className="aboutus-stat-label">{item.label}</span>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="aboutus-founder-card">
                        <img
                            src="/person1.png"
                            alt="Yadnyeshwar Bhatikare"
                            className="aboutus-founder-image"
                        />
                        <h2 className="aboutus-founder-name">Yadnyeshwar Bhatikare</h2>
                        <p className="aboutus-founder-role">Founder & CEO</p>
                        <ul className="aboutus-founder-points">
                            <li>
                                <CheckCircle2 size={16} />
                                Civil Engineering Graduate, DY Patil College
                            </li>
                            <li>
                                <CheckCircle2 size={16} />
                                Specialized in Structural Engineering
                            </li>
                            <li>
                                <CheckCircle2 size={16} />
                                Experience in design, supervision, and project delivery
                            </li>
                        </ul>
                    </aside>
                </div>
            </section>

            <section className="aboutus-section">
                <div className="aboutus-section-head">
                    <p className="aboutus-section-tag">Our Journey</p>
                    <h2>Building a consultancy rooted in technical depth</h2>
                </div>
                <div className="aboutus-timeline">
                    {milestones.map((item) => (
                        <article className="aboutus-timeline-item" key={item.year}>
                            <span className="aboutus-year">{item.year}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="aboutus-section aboutus-values-section">
                <div className="aboutus-section-head aboutus-section-head-dark">
                    <p className="aboutus-section-tag">Core Values</p>
                    <h2>How we make decisions on every project</h2>
                </div>
                <div className="aboutus-values-grid">
                    {values.map((item) => (
                        <article className="aboutus-value-card" key={item.title}>
                            <div className="aboutus-value-icon">
                                <item.icon size={24} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="aboutus-section">
                <div className="aboutus-section-head">
                    <p className="aboutus-section-tag">Leadership</p>
                    <h2>The team driving quality and accountability</h2>
                </div>
                <div className="aboutus-team-grid">
                    {leaders.map((leader) => (
                        <article className="aboutus-team-card" key={leader.name}>
                            <img src={leader.image} alt={leader.name} />
                            <h3>{leader.name}</h3>
                            <p className="aboutus-team-role">{leader.role}</p>
                            <p className="aboutus-team-specialty">{leader.specialty}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="aboutus-cta-band">
                <div className="aboutus-cta-content">
                    <h2>Need a reliable partner for your next construction project?</h2>
                    <p>
                        Let us plan, design, and execute with the precision your project
                        demands.
                    </p>
                    <button
                        type="button"
                        className="aboutus-button aboutus-button-primary"
                        onClick={() => navigate("/contact")}
                    >
                        Talk to Our Team
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
}

export default AboutUs;
