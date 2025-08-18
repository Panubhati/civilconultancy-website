import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
       const navigate = useNavigate();
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="brand-highlight">Anita Construction</span>
                    </h1>
                    <p className="hero-description">
                        Premier civil engineering consultancy delivering comprehensive solutions in 3D-2D Design,structural design, 
                        project management, and construction supervision with innovation and precision.
                    </p>
                    <div className="hero-cta">
                        <button className="cta-button primary" onClick={() => navigate("/services") }>Get Started</button>
                        <button className="cta-button secondary" onClick={() => navigate("/projects")}>View Projects</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="site.png" alt="Modern building designed by Anita Construction" />
                    <div className="hero-placeholder"></div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="services-overview">
                <div className="container">
                    <h2 className="section-title">Our Expertise</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">🏗️</div>
                            <h3>Structural Design</h3>
                            <p>Innovative structural solutions for residential, commercial, and industrial projects</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">📋</div>
                            <h3>Project Management</h3>
                            <p>Comprehensive project oversight from concept to completion</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🔍</div>
                            <h3>Construction Supervision</h3>
                            <p>Expert on-site supervision ensuring quality and compliance</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🌿</div>
                            <h3>Sustainable Design</h3>
                            <p>Eco-friendly solutions for future-ready developments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">
                                Know <span className="text-highlight">About Us</span>
                            </h2>
                            <p className="about-description">
                                Anita Construction is a multidisciplinary civil engineering and construction firm. We collaborate with our clients to design, develop,
                                and deliver projects that reflect our commitment to excellence and innovation. Founded in 2022, we have a world-class team with deep industry expertise and project management skills, enabling us to execute seamless, scalable, and cost-effective solutions.
                            </p>
                            <p className="about-mission">
                                Our goal is to transform complex construction challenges into real opportunities. More than just a contractor, we are your trusted partner in building a better future.
                            </p>
                        </div>
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-number">2022</span>
                                <span className="stat-label">Founded</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Team Members</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🎯</div>
                            <h3>Our Vision</h3>
                            <p>To Empower Businesses worldwide through talent and Passion</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">⚙️</div>
                            <h3>Our Mission</h3>
                            <p>
                                Enduring partnerships that enable continuous growth for our customers,
                                team members, and stakeholders.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">❤️</div>
                            <h3>Our Philosophy</h3>
                            <p>GROW TOGETHER</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2 className="section-title">Meet Our Leadership</h2>
                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-image">
                                <img src="person1.png" alt="Yadnyeshwar Bhatikare" />
                            </div>
                            <div className="team-info">
                                <h3>Yadnyeshwar Bhatikare</h3>
                                <p className="team-role">Founder & CEO</p>
                                <p className="team-specialty">Structural Engineer</p>
                            </div>
                        </div>
                        <div className="team-card">
                            <div className="team-image">
                                <img src="person2.png" alt="Pranav Bhatikare" />
                            </div>
                            <div className="team-info">
                                <h3>Pranav Bhatikare</h3>
                                <p className="team-role">Co-Founder</p>
                                <p className="team-specialty">Computer Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Project?</h2>
                        <p>Let's discuss how we can bring your vision to life with our expertise and dedication.</p>
                         <button
                            className="cta-button primary"
                            onClick={() => navigate("/contact")}  // ✅ use the navigate function
                        >
                            Contact Us Today
                        </button>                    
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
