import React from "react";
import { Link } from "react-router-dom";
import events from "../data/events";

function Events() {
return (
    <div className="page">
        <h2>Available Events</h2>
        <div className="event-list">
            {events.map((e) => (
                <div key={e.id} className="event-card">
                    <img src={e.image} alt={e.name} className="event-img" />
                    <h3>{e.name}</h3>
                    <p>Date: {e.date}</p>
                    <p>Seats: {e.seats}</p>
                    <Link to={`/book/${e.id}`}>
                        <button className="btn">Book Now</button>
                    </Link>
                </div>
            ))}
        </div>
    </div>
);
}

export default Events;