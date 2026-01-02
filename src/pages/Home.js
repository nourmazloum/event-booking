import React from "react";
import { Link } from "react-router-dom";
import events from "../data/events";

function Home() {
  const featured = events.slice(0, 3);

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Discover Events That Inspire</h1>
          <p>
            Explore events, book your seat, and manage your bookings easily.
          </p>

          <Link to="/events">
            <button className="btn">Browse Events</button>
          </Link>
        </div>
      </div>

      <section className="featured-events">
        <h2>
          Featured <span className="accent">Events</span>
        </h2>

        <div className="featured-list">
          {featured.map((e) => (
            <div className="featured-card" key={e.id}>
              <img src={e.image} alt={e.name} />
              <h3>{e.name}</h3>
              <p>Date: {e.date}</p>

              <Link to={`/book/${e.id}`}>
                <button className="btn">Book</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
