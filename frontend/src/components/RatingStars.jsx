import React from 'react';

export default function RatingStars({ score, onChange }) {
  const stars = [1,2,3,4,5];
  return (
    <div>
      {stars.map(s => (
        <button key={s} onClick={() => onChange?.(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
          {s <= score ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
