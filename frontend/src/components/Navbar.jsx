import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/stores" style={{ marginRight: 12 }}>Stores</Link>
      {!user && <Link to="/login">Login</Link>}
      {user && (
        <>
          {user.role === 'System Administrator' && <Link to="/admin" style={{ marginLeft: 12 }}>Admin</Link>}
          {user.role === 'Normal User' && <Link to="/user" style={{ marginLeft: 12 }}>User</Link>}
          {user.role === 'Store Owner' && <Link to="/owner" style={{ marginLeft: 12 }}>Owner</Link>}
          <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
        </>
      )}
    </nav>
  );
}
