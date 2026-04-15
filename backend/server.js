import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://anitaconstruction.in",
    "https://www.anitaconstruction.in",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json()); // Middleware to handle JSON requests

// Error handling for invalid JSON payloads
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }
    next();
});

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Contact Form Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    city: String,
    mobile: String,
    message: String,
    privacyPolicy: Boolean,
    submittedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ Define Consultation Form Schema
const consultationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: String,
    submittedAt: { type: Date, default: Date.now },
});

const Consultation = mongoose.model("Consultation", consultationSchema);

// ✅ API Route to Handle Contact Form Submission
app.post("/api/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error saving contact form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ API Route to Handle Consultation Form Submission
app.post("/api/consultation", async (req, res) => {
    try {
        const { name, phone, city } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: "Name and phone are required." });
        }

        const newConsultation = new Consultation({ name, phone, city });
        await newConsultation.save();
        res.status(201).json({ message: "Consultation booked successfully!" });
    } catch (error) {
        console.error("Error saving consultation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Admin middleware – checks x-admin-key header
const adminAuth = (req, res, next) => {
    const key = req.headers["x-admin-key"];
    const ADMIN_KEY = process.env.ADMIN_KEY || "anita2026admin";
    if (key !== ADMIN_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

// ✅ GET all contact form submissions (admin only)
app.get("/api/admin/contacts", adminAuth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET all consultation submissions (admin only)
app.get("/api/admin/consultations", adminAuth, async (req, res) => {
    try {
        const consultations = await Consultation.find().sort({ submittedAt: -1 });
        res.json(consultations);
    } catch (error) {
        console.error("Error fetching consultations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ DELETE a contact submission (admin only)
app.delete("/api/admin/contacts/:id", adminAuth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ DELETE a consultation submission (admin only)
app.delete("/api/admin/consultations/:id", adminAuth, async (req, res) => {
    try {
        await Consultation.findByIdAndDelete(req.params.id);
        res.json({ message: "Consultation deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/", (req, res) => {
    res.send("");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});