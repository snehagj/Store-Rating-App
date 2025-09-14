import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function StoresList() {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState('');
  const { user } = useContext(AuthContext);

  const load = async () => {
    const res = await API.get('/stores', { params: { q } });
    setStores(res.data.rows || []);
  };

  useEffect(() => { load(); }, []);

  const search = async (e) => {
    e.preventDefault();
    await load();
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Stores</h2>
      <form onSubmit={search}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name/address" /><button>Search</button></form>
      <table border="1" style={{ width: '100%', marginTop: 12 }}>
        <thead><tr><th>Name</th><th>Address</th><th>Average Rating</th><th>Actions</th></tr></thead>
        <tbody>
          {stores.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.averageRating ? Number(s.averageRating).toFixed(2) : 'No ratings'}</td>
              <td><Link to={`/stores/${s.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
