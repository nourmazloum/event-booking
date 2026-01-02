import React, { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setUsers(data);
  }

  async function fetchBookings() {
    const res = await fetch("http://localhost:5000/api/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setBookings(data);
  }

  function updateLocalUser(id, field, value) {
    setUsers(users.map(u => u.id === id ? { ...u, [field]: value } : u));
  }

  async function saveUser(user) {
    await fetch(`http://localhost:5000/api/admin/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        full_name: user.full_name,
        email: user.email,
        role: user.role
      })
    });
    alert("User updated");
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(u => u.id !== id));
  }

  async function deleteBooking(id) {
    if (!window.confirm("Delete booking?")) return;
    await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(bookings.filter(b => b.id !== id));
  }

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* USERS */}
      <div className="admin-card">
        <h3>Users</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>
                  <input
                    value={u.full_name}
                    onChange={e => updateLocalUser(u.id, "full_name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={u.email}
                    onChange={e => updateLocalUser(u.id, "email", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={u.role}
                    onChange={e => updateLocalUser(u.id, "role", e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="admin-btn" onClick={() => saveUser(u)}>
                    Save
                  </button>
                  <button
                    className="admin-btn btn-delete"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOOKINGS */}
      <div className="admin-card">
        <h3>Bookings</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.event_name}</td>
                <td>{b.event_date}</td>
                <td>{b.user_email}</td>
                <td>
                  <button
                    className="admin-btn btn-delete"
                    onClick={() => deleteBooking(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
