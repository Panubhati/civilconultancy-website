import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import "./Footer.css";

const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Blogs", href: "https://example.com/blog" },
    { label: "Site Map", to: "/admin" },
];

const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/anita_construction84/", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/share/16veVNv7ML/", icon: Facebook },
];

function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <section className="footer-brand">
                    <h3>Anita Construction</h3>
                    <p>
                        Civil engineering consultancy focused on practical design, strong
                        execution, and dependable project delivery.
                    </p>
                </section>

                <section>
                    <h4>Quick Links</h4>
                    <ul className="footer-list">
                        {quickLinks.map((item) => (
                            <li key={item.label}>
                                {item.to ? (
                                    <Link to={item.to}>{item.label}</Link>
                                ) : (
                                    <a href={item.href} target="_blank" rel="noreferrer">
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h4>Follow Us</h4>
                    <ul className="footer-list">
                        {socialLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} target="_blank" rel="noreferrer" className="social-link">
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h4>Contact</h4>
                    <ul className="footer-list contact-list">
                        <li>
                            <a href="mailto:anitaconstruction84@gmail.com" className="social-link">
                                <Mail size={16} />
                                <span>anitaconstruction84@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+918421939924" className="social-link">
                                <Phone size={16} />
                                <span>+91 8421939924</span>
                            </a>
                        </li>
                        <li className="social-link">
                            <MapPin size={16} />
                            <span>Latur, Maharashtra, India</span>
                        </li>
                    </ul>
                </section>
            </div>

            <div className="site-footer-bottom">
                <p>&copy; {new Date().getFullYear()} Anita Construction. All rights reserved.</p>
            </div>
        </footer>


    );
}

export default Footer;
