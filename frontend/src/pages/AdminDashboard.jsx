import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard(){
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    API.get('/admin/dashboard').then(res=>setStats(res.data)).catch(()=>{});
    API.get('/admin/users').then(res=>setUsers(res.data.rows || []).catch(()=>{}));
  }, []);
  return (
    <div style={{ padding: 12 }}>
      <h2>Admin Dashboard</h2>
      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Stores: {stats.totalStores}</div>
      <div>Total Ratings: {stats.totalRatings}</div>
      <h3>Users</h3>
      <table border="1"><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr></thead>
        <tbody>{users.map(u=>(
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.Role?.name}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
