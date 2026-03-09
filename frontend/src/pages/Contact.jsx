"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
  AlertCircle,
} from "lucide-react"
import axios from "axios"
import "./Contact.css"

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8421939924",
    href: "tel:+918421939924",
    color: "#2563eb",
  },
  {
    icon: Mail,
    label: "Email",
    value: "yad.bhatikare@gmail.com",
    href: "mailto:yad.bhatikare@gmail.com",
    color: "#ea580c",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Latur,Maharashtra",
    href: null,
    color: "#0f766e",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat, 9 AM – 7 PM",
    href: null,
    color: "#7c3aed",
  },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "India",
    city: "Mumbai",
    mobile: "",
    message: "",
    privacyPolicy: false,
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', message: string }

  const dismissToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(dismissToast, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast, dismissToast])

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

    setLoading(true)
    setError("")
    try {
      const response = await axios.post("https://civilconultancy-website.onrender.com/api/contact", {
        ...formData,
        submittedAt: new Date().toISOString(),
      }, {
        headers: { "Content-Type": "application/json" },
      })
      setToast({ type: "success", message: "Thank you! Your request has been submitted. We'll get back to you within 24 hours." })
      setFormData({
        name: "",
        email: "",
        country: "India",
        city: "Mumbai",
        mobile: "",
        message: "",
        privacyPolicy: false,
      })
    } catch (err) {
      console.error("Error submitting form:", err)
      let msg = "An unexpected error occurred. Please try again."
      if (err.response) {
        msg = err.response.data.error || "Failed to submit form."
      } else if (err.request) {
        msg = "Network error. Please check your connection."
      }
      setToast({ type: "error", message: msg })
    } finally {
      setLoading(false)
    }
  }

  const whatsappNumber = "918421939924"
  const whatsappMessage = encodeURIComponent(
    "Hi Anita Construction, I'm interested in your consultancy services. Could you please share more details?"
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="contact-v2">
      {/* Hero */}
      <section className="contact-v2-hero">
        <div className="contact-v2-hero-inner">
          <p className="contact-v2-kicker">Get In Touch</p>
          <h1>
            Let's discuss your <span>next project</span>
          </h1>
          <p className="contact-v2-subtitle">
            Share your requirements and our team will get back to you with a
            tailored plan within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-v2-methods">
        <div className="contact-v2-methods-grid">
          {contactMethods.map((method) => (
            <article key={method.label} className="contact-v2-method-card">
              <div
                className="contact-v2-method-icon"
                style={{ background: `${method.color}14`, color: method.color }}
              >
                <method.icon size={22} />
              </div>
              <span className="contact-v2-method-label">{method.label}</span>
              {method.href ? (
                <a href={method.href} className="contact-v2-method-value">
                  {method.value}
                </a>
              ) : (
                <span className="contact-v2-method-value">{method.value}</span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Main Content: Form + WhatsApp / Info */}
      <section className="contact-v2-main">
        <div className="contact-v2-main-grid">
          {/* Form */}
          <div className="contact-v2-form-wrap">
            <h2>Send us a message</h2>
            <p className="contact-v2-form-sub">
              Fill in the details below and we'll reach out to you shortly.
            </p>

            {error && <p className="contact-v2-error">{error}</p>}

            <form onSubmit={handleSubmit} className="contact-v2-form">
              <div className="contact-v2-row">
                <div className="contact-v2-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-v2-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-v2-row">
                <div className="contact-v2-field">
                  <label htmlFor="contact-mobile">Mobile Number *</label>
                  <input
                    id="contact-mobile"
                    type="tel"
                    name="mobile"
                    placeholder="10-digit number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="\d{10}"
                  />
                </div>
                <div className="contact-v2-field">
                  <label htmlFor="contact-country">Country</label>
                  <select
                    id="contact-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact-v2-row">
                <div className="contact-v2-field">
                  <label htmlFor="contact-city">City</label>
                  <select
                    id="contact-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
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
                </div>
              </div>

              <div className="contact-v2-field">
                <label htmlFor="contact-message">
                  Project Details (Optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your project — type, area, timeline, etc."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <label className="contact-v2-checkbox">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the{" "}
                  <a href="/privacy-policy">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                className="contact-v2-submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Submit Request"}
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="contact-v2-sidebar">
            {/* WhatsApp CTA */}
            <div className="contact-v2-whatsapp-card">
              <div className="contact-v2-whatsapp-icon">
                <MessageCircle size={28} />
              </div>
              <h3>Chat on WhatsApp</h3>
              <p>
                Get an instant response. Tap below to start a conversation
                directly with our team on WhatsApp.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-v2-whatsapp-btn"
              >
                Open WhatsApp Chat
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Quick info */}
            <div className="contact-v2-info-card">
              <h3>Why reach out?</h3>
              <ul>
                <li>Free initial consultation</li>
                <li>Custom design recommendations</li>
                <li>Transparent cost estimates</li>
                <li>Response within 24 hours</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Toast Notification */}
      {toast && (
        <div className={`contact-v2-toast contact-v2-toast-${toast.type}`}>
          <div className="contact-v2-toast-icon">
            {toast.type === "success" ? (
              <CheckCircle2 size={22} />
            ) : (
              <AlertCircle size={22} />
            )}
          </div>
          <div className="contact-v2-toast-body">
            <strong>{toast.type === "success" ? "Success!" : "Error"}</strong>
            <p>{toast.message}</p>
          </div>
          <button
            type="button"
            className="contact-v2-toast-close"
            onClick={dismissToast}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Contact
