import React, { useState } from "react";
import { useParams } from "react-router-dom";
import events from "../data/events";

function BookEvent() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  const [msg, setMsg] = useState("");

  // 🔐 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!event) {
    return <h2>Event not found</h2>;
  }

  async function handleBooking() {
  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message || "Booking failed");
      return;
    }

    setMsg("✅ Booking confirmed!");
  } catch (err) {
    setMsg("❌ Server error");
  }
}


  return (
    <div className="page">
      <h2>Book: {event.name}</h2>

      <div className="form">
        <p><strong>Name:</strong> {user?.fullname}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <button className="btn" onClick={handleBooking}>
          Confirm Booking
        </button>

        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}

export default BookEvent;
