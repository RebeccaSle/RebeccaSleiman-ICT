/**
 * could have use a react library for reusable table and pagination but here 
 * I worked very basic 
 */
import  { useEffect, useState } from 'react';
import { fetchAllLeaves, approveLeave, rejectLeave } from '../services/leaveService';
import { fetchUsers } from '../services/userService';

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);

  const loadData = async () => {
  try {
    const [leavesRes, usersRes] = await Promise.all([
      fetchAllLeaves(),
      fetchUsers()
    ]);
    console.log('Leaves:', leavesRes.data);
    console.log('Users:', usersRes);
    setLeaves(leavesRes.data);
    setUsers(usersRes);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};


  useEffect(() => {
    loadData();
  }, []);

  const getUserName = (userId) => {
    if (!users || !Array.isArray(users)) return `User ${userId}`;
    const user = users.find(u => u.Id === userId);
    return user ? user.Name || `User ${user.Id}` : `User ${userId}`;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US');
  };

 const handleStatus = async (id, action) => {
      console.log(`Clicked ${action} for leave ${id}`);

  try {
    if (action === 'approve') await approveLeave(id);
    if (action === 'reject') await rejectLeave(id);
    loadData();
  } catch (error) {
    console.error(`Error ${action} leave:`, error);
    alert(`Failed to ${action} leave: ${error.message}`);
  }
};

/**
 * whena leave is approved or declined it still shows in the dashboard 
 * to use the filter for this matter later 
 */
//const pendingLeaves = leaves.filter(l => l.Status === 'Pending');

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th><th>Start</th><th>End</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.Id}>
              <td>{getUserName(l.UserId)}</td>
              <td>{formatDate(l.StartDate)}</td>
              <td>{formatDate(l.EndDate)}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleStatus(l.Id, 'approve')}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleStatus(l.Id, 'reject')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
