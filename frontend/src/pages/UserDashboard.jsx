import React from 'react';
export default function UserDashboard(){ 
  return (
    <div style={{ padding: 12 }}>
      <h2>User Dashboard</h2>
      <p>From here a normal user can view stores, update password (via /auth/update-password), and manage their ratings.</p>
    </div>
  );
}
