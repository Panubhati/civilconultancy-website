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
    CheckCircle,
    Circle,
    UserCheck,
} from "lucide-react";
import axios from "axios";
import "./Admin.css";

const API_BASE = "https://civilconultancy-website.onrender.com";

function Admin() {
    const [authenticated, setAuthenticated] = useState(false);
    const [adminKey, setAdminKey] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [activeTab, setActiveTab] = useState("contacts");
    const [contacts, setContacts] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError("");

        try {
            const res = await axios.post(`${API_BASE}/api/admin/login`, {
                password: passwordInput,
            });
            if (res.data.success) {
                setAdminKey(passwordInput);
                setAuthenticated(true);
                sessionStorage.setItem("admin_key", passwordInput);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setLoginError("Incorrect password. Please try again.");
            } else {
                setLoginError("Unable to connect. Please try again later.");
            }
        }
        setLoginLoading(false);
    };

    // Restore session
    useEffect(() => {
        const savedKey = sessionStorage.getItem("admin_key");
        if (savedKey) {
            setAdminKey(savedKey);
            setAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        setAuthenticated(false);
        setAdminKey("");
        sessionStorage.removeItem("admin_key");
        setPasswordInput("");
    };

    const getHeaders = useCallback(() => ({ "x-admin-key": adminKey }), [adminKey]);

    const fetchData = useCallback(async () => {
        if (!adminKey) return;
        setLoading(true);
        try {
            const [contactRes, consultationRes] = await Promise.all([
                axios.get(`${API_BASE}/api/admin/contacts`, { headers: getHeaders() }),
                axios.get(`${API_BASE}/api/admin/consultations`, { headers: getHeaders() }),
            ]);
            setContacts(contactRes.data);
            setConsultations(consultationRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
        setLoading(false);
    }, [adminKey, getHeaders]);

    useEffect(() => {
        if (authenticated && adminKey) {
            fetchData();
        }
    }, [authenticated, adminKey, fetchData]);

    const toggleContacted = async (type, id, currentStatus) => {
        const endpoint = type === "contact"
            ? `${API_BASE}/api/admin/contacts/${id}`
            : `${API_BASE}/api/admin/consultations/${id}`;

        try {
            const res = await axios.patch(endpoint, { contacted: !currentStatus }, { headers: getHeaders() });
            if (type === "contact") {
                setContacts((prev) => prev.map((c) => (c._id === id ? res.data : c)));
            } else {
                setConsultations((prev) => prev.map((c) => (c._id === id ? res.data : c)));
            }
        } catch {
            alert("Failed to update status.");
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this contact request?")) return;
        try {
            await axios.delete(`${API_BASE}/api/admin/contacts/${id}`, { headers: getHeaders() });
            setContacts((prev) => prev.filter((c) => c._id !== id));
        } catch {
            alert("Failed to delete.");
        }
    };

    const deleteConsultation = async (id) => {
        if (!window.confirm("Delete this consultation request?")) return;
        try {
            await axios.delete(`${API_BASE}/api/admin/consultations/${id}`, { headers: getHeaders() });
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

    // Combine and filter data based on active tab
    const allContacts = contacts.filter((c) => !c.contacted);
    const allConsultations = consultations.filter((c) => !c.contacted);
    const contactedItems = [
        ...contacts.filter((c) => c.contacted).map((c) => ({ ...c, _type: "contact" })),
        ...consultations.filter((c) => c.contacted).map((c) => ({ ...c, _type: "consultation" })),
    ].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    const filteredContacts = allContacts.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredConsultations = allConsultations.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredContacted = contactedItems.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ── LOGIN GATE ────────────────────── */
    if (!authenticated) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card">
                    <div className="admin-login-icon">
                        <Lock size={28} />
                    </div>
                    <h2>Admin Access</h2>
                    <p className="admin-login-sub">Enter your password to continue</p>

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
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
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

    /* ── RENDER CARD ───────────────────── */
    const renderContactCard = (c, showUndo = false) => (
        <div key={c._id} className={`admin-request-card ${c.contacted ? "admin-card-done" : ""}`}>
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
                    className={`admin-tick-btn ${c.contacted ? "admin-tick-active" : ""}`}
                    onClick={() => toggleContacted("contact", c._id, c.contacted)}
                    title={c.contacted ? "Mark as not contacted" : "Mark as contacted"}
                >
                    {c.contacted ? <CheckCircle size={18} /> : <Circle size={18} />}
                </button>
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
    );

    const renderConsultationCard = (c) => (
        <div key={c._id} className={`admin-request-card admin-card-consult ${c.contacted ? "admin-card-done" : ""}`}>
            <div className="admin-card-header">
                <div className="admin-card-avatar admin-avatar-blue">
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
                    className={`admin-tick-btn ${c.contacted ? "admin-tick-active" : ""}`}
                    onClick={() => toggleContacted("consultation", c._id, c.contacted)}
                    title={c.contacted ? "Mark as not contacted" : "Mark as contacted"}
                >
                    {c.contacted ? <CheckCircle size={18} /> : <Circle size={18} />}
                </button>
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
    );

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
                <div className="admin-stat-card admin-stat-orange">
                    <div className="admin-stat-icon">
                        <FileText size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{allContacts.length}</span>
                        <span className="admin-stat-label">Pending Contacts</span>
                    </div>
                </div>
                <div className="admin-stat-card admin-stat-blue">
                    <div className="admin-stat-icon">
                        <Phone size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{allConsultations.length}</span>
                        <span className="admin-stat-label">Pending Consultations</span>
                    </div>
                </div>
                <div className="admin-stat-card admin-stat-green">
                    <div className="admin-stat-icon">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <span className="admin-stat-num">{contactedItems.length}</span>
                        <span className="admin-stat-label">Already Contacted</span>
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
                        Contacts
                        <span className="admin-tab-count">{allContacts.length}</span>
                    </button>
                    <button
                        className={`admin-tab ${activeTab === "consultations" ? "admin-tab-active" : ""}`}
                        onClick={() => setActiveTab("consultations")}
                    >
                        <Phone size={16} />
                        Consultations
                        <span className="admin-tab-count">{allConsultations.length}</span>
                    </button>
                    <button
                        className={`admin-tab ${activeTab === "contacted" ? "admin-tab-active admin-tab-green" : ""}`}
                        onClick={() => setActiveTab("contacted")}
                    >
                        <UserCheck size={16} />
                        Already Contacted
                        <span className="admin-tab-count">{contactedItems.length}</span>
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
                            <p>No pending contact requests.</p>
                        </div>
                    ) : (
                        <div className="admin-cards-grid">
                            {filteredContacts.map((c) => renderContactCard(c))}
                        </div>
                    )
                ) : activeTab === "consultations" ? (
                    filteredConsultations.length === 0 ? (
                        <div className="admin-empty">
                            <Phone size={40} />
                            <p>No pending consultation requests.</p>
                        </div>
                    ) : (
                        <div className="admin-cards-grid">
                            {filteredConsultations.map((c) => renderConsultationCard(c))}
                        </div>
                    )
                ) : (
                    /* Already Contacted Tab */
                    filteredContacted.length === 0 ? (
                        <div className="admin-empty">
                            <UserCheck size={40} />
                            <p>No contacted entries yet.</p>
                        </div>
                    ) : (
                        <div className="admin-cards-grid">
                            {filteredContacted.map((c) =>
                                c._type === "contact"
                                    ? renderContactCard(c, true)
                                    : renderConsultationCard(c)
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Admin;
