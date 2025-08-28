const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { register, login, checkUser } = require("../controllers/authController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Multer storage - keep original filename + extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const original = path.basename(file.originalname);
    const ext = path.extname(original);
    const base = path.basename(original, ext);
    const targetPath = path.join(uploadPath, original);

    if (fs.existsSync(targetPath)) {
      cb(null, `${base}-${Date.now()}${ext}`); // avoid overwriting
    } else {
      cb(null, original);
    }
  }
});

// Allowed file types
const filetypes = /pdf|xlsx|csv|png|jpg|jpeg|gif/;
const fileFilter = (req, file, cb) => {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new Error("Only PDF, Excel, CSV or image files are allowed"));
};

// Multer setup
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// Public Routes
router.post("/register", upload.single("bankStatement"), register);
router.post("/login", login);

// Protected Route (any logged-in user)
router.get("/checkUser", authMiddleware, checkUser);

// Admin-only example route
router.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin! This is the dashboard." });
});

module.exports = router;
