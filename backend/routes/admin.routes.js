const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// USERS
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers);
router.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.updateUserRole
);
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUser
);

// BOOKINGS
router.get(
  "/bookings",
  authMiddleware,
  adminMiddleware,
  adminController.getBookings
);
router.delete(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteBooking
);

module.exports = router;
