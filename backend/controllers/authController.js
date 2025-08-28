const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

const allowedExts = [".pdf", ".xlsx", ".csv", ".png", ".jpg", ".jpeg", ".gif"];

// Register user
const register = async (req, res) => {
  try {
    const { role, username, email, password, phone } = req.body;

    if (!role || !username || !email || !password) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Bad Request", message: "Missing required fields" });
    }

    // Validate bank statement file
    let bankStatement = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (!allowedExts.includes(ext)) {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "Invalid file type" });
      }
      bankStatement = req.file.filename;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (bankStatement && fs.existsSync(path.join("uploads", bankStatement))) {
        fs.unlinkSync(path.join("uploads", bankStatement));
      }
      return res.status(409).json({ error: "Conflict", message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      username,
      email,
      password: hashedPassword,
      phone,
      bankStatement
    });

    res.status(201).json({
      message: "Registration submitted successfully. Awaiting admin approval",
      status: user.status
    });
  } catch (err) {
    console.error("Register error:", err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// Login (unchanged)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// Check user (unchanged)
const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ message: "Valid user", role: user.role, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

module.exports = { register, login, checkUser };
