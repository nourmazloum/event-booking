const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth");

// CREATE BOOKING
router.post("/", authMiddleware, bookingController.createBooking);

// GET MY BOOKINGS
router.get("/my", authMiddleware, bookingController.getMyBookings);

module.exports = router;
