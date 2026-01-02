import React, { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          setMsg(data.message || "Failed to load bookings");
          return;
        }

        setBookings(data);
      } catch (err) {
        setMsg("Server error");
      }
    }

    fetchBookings();
  }, [token]);

  return (
    <div className="page">
      <h2>My Bookings</h2>

      {msg && <p className="message">{msg}</p>}

      {bookings.length === 0 && !msg && (
        <p>You have no bookings yet.</p>
      )}

      {bookings.map((b) => (
        <div key={b.id} className="booking-item">
          <h3>{b.event_name}</h3>
          <p>Date: {b.event_date}</p>
          <p>Booked at: {new Date(b.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
