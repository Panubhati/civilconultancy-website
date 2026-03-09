import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Compass,
  FileCheck2,
  Home,
  Palette,
  Workflow,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

const services = [
  {
    title: "3D and 2D Design Planning",
    description:
      "Concept-to-drawing support with practical site planning, visual clarity, and code-ready detailing.",
    icon: Compass,
    features: [
      "3D project visualization",
      "2D technical drawings",
      "Site and zoning layout",
      "Concept revisions",
    ],
  },
  {
    title: "Structural Design",
    description:
      "Engineered structural systems designed for stability, long-term performance, and local regulation compliance.",
    icon: Building2,
    features: [
      "Structural analysis",
      "Foundation design",
      "Load and reinforcement planning",
      "Seismic response detailing",
    ],
  },
  {
    title: "Project Management",
    description:
      "Execution leadership from kickoff to handover with milestone tracking and vendor coordination.",
    icon: Workflow,
    features: [
      "Timeline planning",
      "Resource coordination",
      "Quality monitoring",
      "Risk tracking",
    ],
  },
  {
    title: "Cost Estimation",
    description:
      "Detailed quantity and budget planning so project decisions are made on reliable numbers.",
    icon: Calculator,
    features: [
      "BOQ and cost breakup",
      "Material estimation",
      "Labor costing",
      "Budget optimization",
    ],
  },
  {
    title: "Building Permissions",
    description:
      "End-to-end approval assistance to move your project smoothly through municipal and authority processes.",
    icon: FileCheck2,
    features: [
      "Permit documentation",
      "Regulatory checks",
      "Submission support",
      "Approval follow-up",
    ],
  },
  {
    title: "Interior Design",
    description:
      "Function-first interior layouts with balanced aesthetics for residential and commercial environments.",
    icon: Home,
    features: [
      "Space planning",
      "Material and finish selection",
      "Lighting planning",
      "Furniture layout",
    ],
  },
  {
    title: "Exterior Design",
    description:
      "Facade and outdoor concept development that improves street presence and architectural identity.",
    icon: Palette,
    features: [
      "Facade concepts",
      "Landscape alignment",
      "Exterior material palette",
      "Visual harmony planning",
    ],
  },
];

const processSteps = [
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

function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-v3">
      <section className="services-v3-hero">
        <div className="services-v3-hero-grid">
          <div className="services-v3-hero-copy">
            <p className="services-v3-kicker">Engineering and Design Services</p>
            <h1>
              End-to-end civil consultancy for <span>residential and commercial projects</span>
            </h1>
            <p className="services-v3-subtitle">
              We combine design, structural rigor, cost planning, and execution guidance so your
              project moves from idea to delivery with fewer delays and clearer decisions.
            </p>
            <div className="services-v3-actions">
              <button
                className="services-v3-btn services-v3-btn-primary"
                type="button"
                onClick={() => navigate("/contact")}
              >
                Get Quote
                <ArrowRight size={18} />
              </button>
              <button
                className="services-v3-btn services-v3-btn-secondary"
                type="button"
                onClick={() => navigate("/contact")}
              >
                Talk to Our Team
              </button>
            </div>
            <div className="services-v3-stat-grid">
              <article className="services-v3-stat-card">
                <strong>7+</strong>
                <span>Core services</span>
              </article>
              <article className="services-v3-stat-card">
                <strong>98%</strong>
                <span>Plan approval success</span>
              </article>
              <article className="services-v3-stat-card">
                <strong>24h</strong>
                <span>Initial response time</span>
              </article>
            </div>
          </div>

          <aside className="services-v3-panel">
            <h2>Why clients rely on Anita Construction</h2>
            <ul>
              <li>
                <CheckCircle2 size={18} />
                <span>Single-point support from planning to execution.</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Transparent technical and budget communication.</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Design solutions optimized for practical construction.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="services-v3-catalog">
        <div className="services-v3-section-head">
          <p>Service Catalog</p>
          <h2>Specialized services designed for reliable project outcomes</h2>
        </div>
        <div className="services-v3-grid">
          {services.map((service) => (
            <article key={service.title} className="services-v3-card">
              <div className="services-v3-card-head">
                <div className="services-v3-icon-wrap">
                  <service.icon size={24} />
                </div>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              <ul className="services-v3-feature-list">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="services-v3-book-btn"
                onClick={() => navigate("/contact")}
              >
                <ArrowRight size={18} />
                Get Quote
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="services-v3-process">
        <div className="services-v3-process-inner">
          <div className="services-v3-section-head services-v3-section-head-dark">
            <p>How We Work</p>
            <h2>A clear 4-step process from idea to final drawings</h2>
          </div>
          <div className="services-v3-process-grid">
            {processSteps.map((step) => (
              <article key={step.step} className="services-v3-process-card">
                <span className="services-v3-step-index">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-v3-cta">
        <div className="services-v3-cta-inner">
          <h2>Need support for an upcoming project?</h2>
          <p>
            Share your requirement and we will recommend the right design, compliance, and
            execution path for your timeline and budget.
          </p>
          <button
            type="button"
            className="services-v3-btn services-v3-btn-primary"
            onClick={() => navigate("/contact")}
          >
            Contact Us Today
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Services;
