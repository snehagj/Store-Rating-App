import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function OwnerDashboard(){
  const [data, setData] = useState([]);
  useEffect(()=> {
    API.get('/ratings/owner/ratings').then(res=>setData(res.data)).catch(()=>{});
  }, []);
  return (
    <div style={{ padding: 12 }}>
      <h2>Store Owner Dashboard</h2>
      {data.map(d=>(
        <div key={d.store.id} style={{ border: '1px solid #ddd', marginBottom: 12, padding: 8 }}>
          <h3>{d.store.name}</h3>
          <div>Average Rating: {d.averageRating || 'No ratings'}</div>
          <h4>Ratings</h4>
          <ul>{d.ratings.map(r=>(
            <li key={r.id}>{r.User?.name} — {r.score} — {r.comment}</li>
          ))}</ul>
        </div>
      ))}
    </div>
  );
}
