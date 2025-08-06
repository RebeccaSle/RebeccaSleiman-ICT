// src/pages/EmployeeDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchLeavesByUser, createLeave, deleteLeave } from '../services/leaveService';
import { fetchUsers } from '../services/userService';

const EmployeeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: '', endDate: '' });

 const loadUsers = async () => {
  try {
    const data = await fetchUsers(); // `data` is already the array
    console.log('Fetched users:', data);
    setUsers(data);
    if (data.length > 0) setSelectedUserId(data[0].Id);
  } catch (error) {
    console.error('Error loading users:', error);
  }
};


  const loadLeaves = async (userId) => {
    try {
      const res = await fetchLeavesByUser(userId);
      setLeaves(res.data || []);
    } catch (error) {
      console.error('Error loading leaves:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) loadLeaves(selectedUserId);
  }, [selectedUserId]);

  const handleCreate = async () => {
    if (!selectedUserId || !form.startDate || !form.endDate) return;

    try {
      await createLeave({ userId: selectedUserId, ...form });
      setForm({ startDate: '', endDate: '' });
      loadLeaves(selectedUserId);
    } catch (err) {
      console.error('Error creating leave:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeave(id);
      loadLeaves(selectedUserId);
    } catch (err) {
      console.error('Error deleting leave:', err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US'); // MM/DD/YYYY
  };

  return (
    <div className="container mt-4">
      <h2>Employee Dashboard</h2>

      <div className="mb-3">
        <label>Select Employee:</label>
        <select
          className="form-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.length === 0 ? (
            <option disabled>No employees found</option>
          ) : (
            users.map((u) => (
              <option key={u.Id} value={u.Id}>
                {u.Name || `User ${u.Id}`}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="mb-4">
        <h5>Apply for Leave</h5>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Submit
        </button>
      </div>

      <h5>Leave Requests</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="4">No leave requests found.</td>
            </tr>
          ) : (
            leaves.map((l) => (
              <tr key={l.Id}>
                <td>{formatDate(l.StartDate)}</td>
                <td>{formatDate(l.EndDate)}</td>
                <td>{l.Status}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(l.Id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
