
const dns = require("dns");

// Use public DNS resolvers for Node.js DNS lookups
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const videoRoutes = require("./routes/videoRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const blogRoutes = require("./routes/blogRoutes");
const socialRoutes = require("./routes/socialRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// MongoDB connection
connectDB();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://tootistan-dental.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Toothistan Backend API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
