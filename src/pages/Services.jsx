import { Phone, BookOpen, Building, Calculator, FileText, Home, Palette, Compass } from 'lucide-react';
import { useState } from 'react';
import "./Services.css";
import { Navigate } from "react-router-dom";

const services = [
  {
    title: "3D & 2D Design and Planning",
    description: "Comprehensive architectural visualization and detailed planning with cutting-edge 3D modeling and precise 2D technical drawings.",
    icon: Compass,
    features: ["3D Architectural Visualization", "2D Technical Drawings", "Site Planning", "Conceptual Design"]
  },
  {
    title: "Structural Design",
    description: "Expert structural engineering solutions ensuring safety, durability, and compliance with industry standards.",
    icon: Building,
    features: ["Structural Analysis", "Foundation Design", "Load Calculations", "Seismic Design"]
  },
  {
    title: "Project Management",
    description: "End-to-end project management services from conception to completion, ensuring timely delivery and budget control.",
    icon: BookOpen,
    features: ["Timeline Management", "Resource Planning", "Quality Control", "Risk Assessment"]
  },
  {
    title: "Cost Estimation",
    description: "Accurate cost estimation and budget planning services to help you make informed financial decisions.",
    icon: Calculator,
    features: ["Detailed Cost Analysis", "Material Estimation", "Labor Costing", "Budget Planning"]
  },
  {
    title: "Building Permission",
    description: "Complete assistance with building permits, regulatory approvals, and compliance documentation.",
    icon: FileText,
    features: ["Permit Applications", "Regulatory Compliance", "Documentation Support", "Approval Process Management"]
  },
  {
    title: "Interior Design",
    description: "Creative interior design solutions that blend functionality with aesthetic appeal for residential and commercial spaces.",
    icon: Home,
    features: ["Space Planning", "Material Selection", "Lighting Design", "Furniture Layout"]
  },
  {
    title: "Exterior Design",
    description: "Stunning exterior design concepts that enhance curb appeal and architectural character of your property.",
    icon: Palette,
    features: ["Facade Design", "Landscape Integration", "Material Selection", "Aesthetic Enhancement"]
  }
];

function Services() {
  const [selectedService, setSelectedService] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleBookCall = (serviceName) => {
    setSelectedService(serviceName);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple toast notification replacement
    alert(`Call Request Submitted!\nWe'll contact you soon regarding ${selectedService}. Thank you for your interest!`);
    
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSelectedService('');
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Our <span className="hero-highlight">Services</span>
          </h1>
          <p className="hero-description">
            Comprehensive civil engineering and construction services tailored to meet your specific project requirements. 
            From concept to completion, we deliver excellence in every aspect of construction and design.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-header">
                <div className="service-icon-container">
                  <service.icon className="service-icon" />
                </div>
                <h3 className="service-title">
                  {service.title}
                </h3>
                <p className="service-description">
                  {service.description}
                </p>
              </div>
              <div className="service-content">
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-feature">
                      <div className="feature-bullet"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleBookCall(service.title)}
                  className="book-call-button"
                >
                  <Phone className="button-icon" />
                  Book a Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Start Your Project?
          </h2>
          <p className="cta-description">
            Contact us today to discuss how we can bring your vision to life with our comprehensive engineering and construction services.
          </p>
          <button className="cta-button" onClick={ () => Navigate("/contact") }>
            <Phone className="button-icon" />
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Custom Dialog Modal */}
      {isDialogOpen && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">
                Book a Call for {selectedService}
              </h2>
              <button className="dialog-close" onClick={closeDialog}>
                ×
              </button>
            </div>
            <p className="dialog-description">
              Fill out the form below and we'll contact you to discuss your {selectedService.toLowerCase()} requirements.
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-field">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="message" className="form-label">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Brief description of your project"
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <button type="submit" className="submit-button">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;