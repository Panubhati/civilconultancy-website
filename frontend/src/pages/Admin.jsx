import { useState, useEffect, useCallback } from "react";
import {
    Lock,
    LogOut,
    Users,
    MessageSquare,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Trash2,
    RefreshCw,
    Search,
    FileText,
    AlertCircle,
    Eye,
    EyeOff,
} from "lucide-react";
import axios from "axios";
import "./Admin.css";

const API_BASE = "https://civilconultancy-website.onrender.com";

function Admin() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [activeTab, setActiveTab] = useState("contacts");
    const [contacts, setContacts] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const adminKey = "anita2026admin";

    const headers = { "x-admin-key": adminKey };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError("");

        if (password === adminKey) {
            try {
                // Verify with backend
                await axios.get(`${API_BASE}/api/admin/contacts`, { headers: { "x-admin-key": password } });
                setAuthenticated(true);
                sessionStorage.setItem("admin_auth", "true");
            } catch {
                setLoginError("Unable to connect. Please try again.");
            }
        } else {
            setLoginError("Incorrect password.");
        }
        setLoginLoading(false);
    };

    const handleLogout = () => {
        setAuthenticated(false);
        sessionStorage.removeItem("admin_auth");
        setPassword("");
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [contactRes, consultationRes] = await Promise.all([
                axios.get(`${API_BASE}/api/admin/contacts`, { headers }),
                axios.get(`${API_BASE}/api/admin/consultations`, { headers }),
            ]);
            setContacts(contactRes.data);
            setConsultations(consultationRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (authenticated) {
            fetchData();
        }
    }, [authenticated, fetchData]);

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this contact request?")) return;
        try {
            await axios.delete(`${API_BASE}/api/admin/contacts/${id}`, { headers });
            setContacts((prev) => prev.filter((c) => c._id !== id));
        } catch {
            alert("Failed to delete.");
        }
    };

    const deleteConsultation = async (id) => {
        if (!window.confirm("Delete this consultation request?")) return;
        try {
            await axios.delete(`${API_BASE}/api/admin/consultations/${id}`, { headers });
            setConsultations((prev) => prev.filter((c) => c._id !== id));
        } catch {
            alert("Failed to delete.");
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const filteredContacts = contacts.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredConsultations = consultations.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ── LOGIN GATE ────────────────────── */
    if (!authenticated) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card">
                    <div className="admin-login-icon">
                        <Lock size={32} />
                    </div>
                    <h2>Admin Access</h2>
                    <p>Enter the admin password to continue</p>

                    {loginError && (
                        <div className="admin-login-error">
                            <AlertCircle size={16} />
                            <span>{loginError}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="admin-login-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="button"
                                className="admin-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <button type="submit" className="admin-login-btn" disabled={loginLoading}>
                            {loginLoading ? "Verifying…" : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    /* ── DASHBOARD ──────────────────────── */
    return (
        <div className="admin-panel">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1>Admin Dashboard</h1>
                    <span className="admin-badge">Anita Construction</span>
                </div>
                <div className="admin-header-right">
                    <button className="admin-refresh-btn" onClick={fetchData} disabled={loading}>
                        <RefreshCw size={16} className={loading ? "admin-spin" : ""} />
                        Refresh
                    </button>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="admin-stats-row">
                <div className="admin-stat-card admin-stat-blue">
                    <div className="admin-stat-icon">
                        <FileText size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{contacts.length}</span>
                        <span className="admin-stat-label">Contact Requests</span>
                    </div>
                </div>
                <div className="admin-stat-card admin-stat-green">
                    <div className="admin-stat-icon">
                        <Phone size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{consultations.length}</span>
                        <span className="admin-stat-label">Consultations</span>
                    </div>
                </div>
                <div className="admin-stat-card admin-stat-purple">
                    <div className="admin-stat-icon">
                        <Users size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{contacts.length + consultations.length}</span>
                        <span className="admin-stat-label">Total Leads</span>
                    </div>
                </div>
            </div>

            {/* Tabs + Search */}
            <div className="admin-toolbar">
                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${activeTab === "contacts" ? "admin-tab-active" : ""}`}
                        onClick={() => setActiveTab("contacts")}
                    >
                        <MessageSquare size={16} />
                        Contact Requests
                        <span className="admin-tab-count">{contacts.length}</span>
                    </button>
                    <button
                        className={`admin-tab ${activeTab === "consultations" ? "admin-tab-active" : ""}`}
                        onClick={() => setActiveTab("consultations")}
                    >
                        <Phone size={16} />
                        Consultations
                        <span className="admin-tab-count">{consultations.length}</span>
                    </button>
                </div>
                <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="admin-content">
                {loading ? (
                    <div className="admin-loading">
                        <RefreshCw size={28} className="admin-spin" />
                        <p>Loading data…</p>
                    </div>
                ) : activeTab === "contacts" ? (
                    filteredContacts.length === 0 ? (
                        <div className="admin-empty">
                            <FileText size={40} />
                            <p>No contact requests found.</p>
                        </div>
                    ) : (
                        <div className="admin-cards-grid">
                            {filteredContacts.map((c) => (
                                <div key={c._id} className="admin-request-card">
                                    <div className="admin-card-header">
                                        <div className="admin-card-avatar">
                                            {c.name?.charAt(0)?.toUpperCase() || "?"}
                                        </div>
                                        <div className="admin-card-name-wrap">
                                            <h3>{c.name}</h3>
                                            <span className="admin-card-date">
                                                <Calendar size={13} />
                                                {formatDate(c.submittedAt)}
                                            </span>
                                        </div>
                                        <button
                                            className="admin-delete-btn"
                                            onClick={() => deleteContact(c._id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="admin-card-body">
                                        {c.email && (
                                            <div className="admin-card-row">
                                                <Mail size={14} />
                                                <span>{c.email}</span>
                                            </div>
                                        )}
                                        {c.mobile && (
                                            <div className="admin-card-row">
                                                <Phone size={14} />
                                                <span>{c.mobile}</span>
                                            </div>
                                        )}
                                        {(c.city || c.country) && (
                                            <div className="admin-card-row">
                                                <MapPin size={14} />
                                                <span>
                                                    {[c.city, c.country].filter(Boolean).join(", ")}
                                                </span>
                                            </div>
                                        )}
                                        {c.message && (
                                            <div className="admin-card-message">
                                                <p>{c.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : filteredConsultations.length === 0 ? (
                    <div className="admin-empty">
                        <Phone size={40} />
                        <p>No consultation requests found.</p>
                    </div>
                ) : (
                    <div className="admin-cards-grid">
                        {filteredConsultations.map((c) => (
                            <div key={c._id} className="admin-request-card admin-card-consult">
                                <div className="admin-card-header">
                                    <div className="admin-card-avatar admin-avatar-green">
                                        {c.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                    <div className="admin-card-name-wrap">
                                        <h3>{c.name}</h3>
                                        <span className="admin-card-date">
                                            <Calendar size={13} />
                                            {formatDate(c.submittedAt)}
                                        </span>
                                    </div>
                                    <button
                                        className="admin-delete-btn"
                                        onClick={() => deleteConsultation(c._id)}
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="admin-card-body">
                                    {c.phone && (
                                        <div className="admin-card-row">
                                            <Phone size={14} />
                                            <span>{c.phone}</span>
                                        </div>
                                    )}
                                    {c.city && (
                                        <div className="admin-card-row">
                                            <MapPin size={14} />
                                            <span>{c.city}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
