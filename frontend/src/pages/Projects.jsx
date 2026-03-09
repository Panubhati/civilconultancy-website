
import React, { useState } from 'react';
import { Building, Calendar, MapPin, Eye, ExternalLink, Filter, Grid, List } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: "Modern Residential Complex",
    category: "Residential",
    location: "Pune, Maharashtra",
    year: "2023",
    description: "A 15-story residential complex featuring modern amenities, sustainable design, and earthquake-resistant structure.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600",
    services: ["Structural Design", "3D Planning", "Project Management"],
    status: "Completed",
    area: "2.5 Lakh sq.ft"
  },
  {
    id: 2,
    title: "Commercial Plaza Development",
    category: "Commercial",
    location: "Mumbai, Maharashtra",
    year: "2023",
    description: "Multi-use commercial plaza with retail spaces, offices, and parking facilities designed for maximum efficiency.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600",
    services: ["Structural Design", "Cost Estimation", "Building Permission"],
    status: "Under Construction",
    area: "3.8 Lakh sq.ft"
  },
  {
    id: 3,
    title: "Luxury Villa Project",
    category: "Residential",
    location: "Lonavala, Maharashtra",
    year: "2022",
    description: "Premium villa design with contemporary architecture, landscaping, and smart home integration.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600",
    services: ["3D & 2D Design", "Interior Design", "Exterior Design"],
    status: "Completed",
    area: "8,500 sq.ft"
  },
  {
    id: 4,
    title: "Industrial Warehouse Complex",
    category: "Industrial",
    location: "Aurangabad, Maharashtra",
    year: "2023",
    description: "Large-scale industrial facility with optimized storage solutions and modern loading docks.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600",
    services: ["Structural Design", "Project Management", "Cost Estimation"],
    status: "Completed",
    area: "5.2 Lakh sq.ft"
  },
  {
    id: 5,
    title: "Educational Institute Building",
    category: "Institutional",
    location: "Nashik, Maharashtra",
    year: "2022",
    description: "Modern educational facility with classrooms, laboratories, and administrative spaces.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600",
    services: ["Structural Design", "3D Planning", "Building Permission"],
    status: "Completed",
    area: "1.8 Lakh sq.ft"
  },
  {
    id: 6,
    title: "Healthcare Center Development",
    category: "Healthcare",
    location: "Kolhapur, Maharashtra",
    year: "2023",
    description: "State-of-the-art healthcare facility with specialized medical equipment infrastructure.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600",
    services: ["Structural Design", "Project Management", "Interior Design"],
    status: "Under Construction",
    area: "95,000 sq.ft"
  }
];

const categories = ["All", "Residential", "Commercial", "Industrial", "Institutional", "Healthcare"];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <h1 className="projects-hero-title">
            Our <span className="projects-highlight">Projects</span>
          </h1>
          <p className="projects-hero-description">
            Explore our portfolio of successful projects across various sectors. Each project represents 
            our commitment to excellence, innovation, and client satisfaction.
          </p>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="projects-controls">
        <div className="projects-filters">
          <Filter className="filter-icon" />
          <span className="filter-label">Filter by Category:</span>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="view-toggle">
          <button
            onClick={() => setViewMode("grid")}
            className={`view-button ${viewMode === "grid" ? 'active' : ''}`}
          >
            <Grid className="view-icon" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`view-button ${viewMode === "list" ? 'active' : ''}`}
          >
            <List className="view-icon" />
          </button>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="projects-content">
        <div className={`projects-grid ${viewMode === "list" ? 'list-view' : 'grid-view'}`}>
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <button 
                    onClick={() => openProjectDetails(project)}
                    className="project-view-button"
                  >
                    <Eye className="button-icon" />
                    View Details
                  </button>
                </div>
                <div className="project-status">
                  <span className={`status-badge ${project.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-details">
                  <div className="project-detail">
                    <MapPin className="detail-icon" />
                    <span>{project.location}</span>
                  </div>
                  <div className="project-detail">
                    <Calendar className="detail-icon" />
                    <span>{project.year}</span>
                  </div>
                  <div className="project-detail">
                    <Building className="detail-icon" />
                    <span>{project.area}</span>
                  </div>
                </div>

                <div className="project-services">
                  {project.services.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="projects-stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">15+</h3>
            <p className="stat-label">Cities Served</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Client Satisfaction</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">3+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectDetails}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectDetails}>×</button>
            
            <div className="modal-content">
              <div className="modal-image-section">
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
              </div>
              
              <div className="modal-details">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-category">{selectedProject.category}</span>
                </div>
                
                <p className="modal-description">{selectedProject.description}</p>
                
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <MapPin className="info-icon" />
                    <div>
                      <span className="info-label">Location</span>
                      <span className="info-value">{selectedProject.location}</span>
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <Calendar className="info-icon" />
                    <div>
                      <span className="info-label">Year</span>
                      <span className="info-value">{selectedProject.year}</span>
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <Building className="info-icon" />
                    <div>
                      <span className="info-label">Area</span>
                      <span className="info-value">{selectedProject.area}</span>
                    </div>
                  </div>
                </div>
                
                <div className="modal-services">
                  <h4 className="services-title">Services Provided</h4>
                  <div className="modal-service-tags">
                    {selectedProject.services.map((service, index) => (
                      <span key={index} className="modal-service-tag">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
