import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware Configuration
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

// ✅ API Route to Handle Form Submission
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

app.get("/", (req, res) => {
    res.send("");
});



// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});