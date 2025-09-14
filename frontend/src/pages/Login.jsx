import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const u = await login(form);
      // redirect by role
      if (u.role === 'System Administrator') navigate('/admin');
      else if (u.role === 'Store Owner') navigate('/owner');
      else navigate('/user');
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: '20px auto' }}>
      <h3>Login</h3>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
      <button type="submit">Login</button>
    </form>
  );
}
