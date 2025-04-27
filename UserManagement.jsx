import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "https://your-firebase-db.firebaseio.com/users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}.json`);
      const data = res.data;
      const parsedUsers = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
      setUsers(parsedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid Name and Email!");
      return;
    }

    try {
      if (editId) {
        await axios.patch(`${baseURL}/${editId}.json`, form);
      } else {
        await axios.post(`${baseURL}.json`, form);
      }
      setForm({ name: "", email: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      setError("Operation failed!");
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}.json`);
      fetchUsers();
    } catch (err) {
      setError("Delete failed!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editId ? "Update User" : "Add User"}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}{" "}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;