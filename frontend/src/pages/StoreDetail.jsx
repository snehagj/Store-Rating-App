import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import RatingStars from '../components/RatingStars';
import { AuthContext } from '../contexts/AuthContext';

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const load = async () => {
    const res = await API.get(`/stores/${id}`);
    setStore(res.data.store);
    // check user rating
    const ratings = res.data.store.Ratings || [];
    const my = ratings.find(r => r.User && r.User.id === user?.id);
    if (my) { setUserRating(my.score); setComment(my.comment || ''); }
  };

  useEffect(()=>{ load(); }, [id]);

  const submitRating = async () => {
    await API.post('/ratings', { storeId: Number(id), score: userRating, comment });
    await load();
  };

  return (
    <div style={{ padding: 12 }}>
      {!store ? <div>Loading...</div> :
        <>
          <h2>{store.name}</h2>
          <div>{store.address}</div>
          <div>Average Rating: { (store.Ratings.length ? (store.Ratings.reduce((a,b)=>a+b.score,0)/store.Ratings.length).toFixed(2) : 'No ratings') }</div>

          {user?.role === 'Normal User' && (
            <div style={{ marginTop: 12 }}>
              <h4>Your Rating</h4>
              <RatingStars score={userRating} onChange={setUserRating} />
              <textarea placeholder="Comment" value={comment} onChange={e=>setComment(e.target.value)} />
              <button onClick={submitRating}>Submit / Update</button>
            </div>
          )}

          <h4>All Ratings</h4>
          <ul>
            {store.Ratings.map(r => <li key={r.id}><strong>{r.User?.name}</strong>: {r.score} - {r.comment}</li>)}
          </ul>
        </>
      }
    </div>
  );
}
