import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const fetchLeavesByUser = (userId) =>
  axios.get(`${API}/leaves/user/${userId}`);

export const fetchAllLeaves = () =>
  axios.get(`${API}/leaves`);

export const createLeave = (data) =>
  axios.post(`${API}/leaves`, data);

export const updateLeave = (id, data) =>
  axios.put(`${API}/leaves/${id}`, data);

export const deleteLeave = (id) =>
  axios.delete(`${API}/leaves/${id}`);

export const approveLeave = (id) =>
  axios.patch(`${API}/leaves/${id}/approve`);

export const rejectLeave = (id) =>
  axios.patch(`${API}/leaves/${id}/reject`);
