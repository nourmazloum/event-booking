const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================
// SIGNUP
// =====================
exports.signup = (req, res) => {
  const { full_name, email, phone, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if email exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("SIGNUP CHECK ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO users (full_name, email, phone, password, role)
           VALUES (?, ?, ?, ?, 'user')`,
          [full_name, email, phone || null, hashedPassword],
          (err) => {
            if (err) {
              console.error("SIGNUP INSERT ERROR:", err);
              return res.status(500).json({ message: "Server error" });
            }

            res.status(201).json({ message: "Signup successful" });
          }
        );
      } catch (e) {
        console.error("HASH ERROR:", e);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
};

// =====================
// LOGIN
// =====================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("LOGIN QUERY ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            full_name: user.full_name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.json({
          token,
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
        });
      } catch (e) {
        console.error("LOGIN ERROR:", e);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
};
