const db = require("../config/db");

exports.createBooking = (req, res) => {
  try {
    const user = req.user; // from JWT middleware
    const { eventId, eventName, eventDate } = req.body;

    if (!eventId || !eventName || !eventDate) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const sql = `
      INSERT INTO bookings
      (event_id, event_name, event_date, user_id, user_email, user_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        eventId,
        eventName,
        eventDate,
        user.id,
        user.email,
        user.full_name
      ],
      (err, result) => {
        if (err) {
          console.error("❌ SQL ERROR:", err);
          return res.status(500).json({ message: "Booking failed" });
        }

        res.status(201).json({
          message: "Booking created successfully",
          bookingId: result.insertId
        });
      }
    );
  } catch (error) {
    console.error("❌ BOOKING ERROR:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

exports.getMyBookings = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to load bookings" });
      }
      res.json(results);
    }
  );
};
