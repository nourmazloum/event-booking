const db = require("../config/db");

// ================= USERS =================
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, full_name, email, phone, role FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Failed to load users" });
      res.json(results);
    }
  );
};

exports.updateUserRole = (req, res) => {
  const { full_name, email, role } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET full_name = ?, email = ?, role = ? WHERE id = ?",
    [full_name, email, role, id],
    (err) => {
      if (err) {
        console.error("UPDATE USER ERROR:", err);
        return res.status(500).json({ message: "Update failed" });
      }
      res.json({ message: "User updated" });
    }
  );
};


exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "User deleted" });
  });
};

// ================= BOOKINGS =================
exports.getBookings = (req, res) => {
  db.query(
    `SELECT id, event_name, event_date, user_email, user_id 
     FROM bookings ORDER BY created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Failed to load bookings" });
      res.json(results);
    }
  );
};

exports.deleteBooking = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM bookings WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "Booking deleted" });
  });
};
