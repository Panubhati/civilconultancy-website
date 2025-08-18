"use client"

import { useState } from "react"
import axios from "axios"
import "./Contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "India",
    city: "Mumbai",
    mobile: "",
    privacyPolicy: false,
  })

  const [error, setError] = useState("") // State to handle form errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required.")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required.")
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (!formData.mobile.trim()) {
      setError("Mobile number is required.")
      return false
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.")
      return false
    }
    if (!formData.privacyPolicy) {
      setError("You must agree to the privacy policy.")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      alert(response.data.message)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        country: "India",
        city: "Mumbai",
        mobile: "",
        privacyPolicy: false,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      if (error.response) {
        // Server responded with an error (e.g., validation error)
        alert(`Error: ${error.response.data.error || "Failed to submit form."}`)
      } else if (error.request) {
        // No response received (e.g., network error)
        alert("Network error. Please check your connection and try again.")
      } else {
        // Other errors
        alert("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-form">
          <h2 className="contact-title">
            <span>Request</span> a call back
          </h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Name*
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </label>
            <label>
              E-Mail ID*
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </label>
            <label>
              Select Country*
              <select name="country" value={formData.country} onChange={handleChange} required aria-required="true">
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Select City*
              <select name="city" value={formData.city} onChange={handleChange} required aria-required="true">
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Enter Mobile Number*
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                aria-required="true"
                pattern="\d{10}"
                title="Please enter a valid 10-digit mobile number."
              />
            </label>
            <label className="privacy-policy">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                required
                aria-required="true"
              />
              By checking this box, you agree to our <a href=" / privacy-policy">Privacy Policy</a> 
            </label>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="customer-service-info">
          <h3>Customer Service Contact</h3>
          <p>
            Email: <a href="mailto:support@example.com">yad.bhatikare@gmail.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+91 8421939924</a> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact

