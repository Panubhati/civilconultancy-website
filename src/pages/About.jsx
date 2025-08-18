import React from "react";
import "./About.css";


function AboutUs() {
    return (
        <div className="about-container">
            <h2 className="about-title">About <span>Us</span></h2>
            <div className="about-content">
                <div className="founder-section">
                    <img src="person1.png" alt="Founder" className="founder-image" />
                    <h3 className="founder-name">Yadnyeshwar Bhatikare</h3>
                    <p className="founder-title">Founder & CEO</p>
                </div>
                <div className="story-section">
                    <h3>Our Story</h3>
                    <p>
                    Yadnyeshwar Bhatikare, the visionary founder of our consultancy firm, embarked on his journey in civil engineering with an unwavering passion for structural excellence. He earned his civil engineering degree from DY Patil College, Akurdi, in 2021, where he laid the foundation for his technical expertise and problem-solving acumen.
                     His relentless pursuit of knowledge led him to specialize in Structural Engineering at Bidve College,
                      where he deepened his understanding of advanced structural analysis, innovative design methodologies,
                       and cutting-edge construction techniques.
 
                    With a strong command over structural principles and design innovations, Yadnyeshwar has been instrumental in delivering forward-thinking solutions for modern infrastructure. His expertise spans high-rise structures, bridges, industrial facilities, and sustainable urban developments, reflecting his commitment to engineering excellence. His ability to integrate technology, sustainability, and cost-effective solutions has set him apart as a leader in the field.
                    </p>
                    <p>
                    Beyond academics, his hands-on industrial experience in civil construction and project management has equipped him with the practical insights necessary to navigate complex engineering challenges. Working on diverse projects, he has mastered the art of balancing aesthetics, safety, functionality, and economic feasibility—qualities that define the very essence of our firm.
                    </p>
                    <p>
                    Under his dynamic leadership, our consultancy firm has grown into a trusted name in the industry, offering innovative, durable, and sustainable engineering solutions. His vision is to revolutionize the way infrastructure is designed and executed, ensuring efficiency, longevity, and environmental responsibility.

Driven by a deep-seated belief in progress, Yadnyeshwar continues to push boundaries, empowering clients to build with confidence, shaping skylines, and laying the groundwork for a future where engineering meets ingenuity.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
