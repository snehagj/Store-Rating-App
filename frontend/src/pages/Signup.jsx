import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/user');
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 480, margin: '20px auto' }}>
      <h3>Signup</h3>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><br/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
      <textarea placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /><br/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
      <button type="submit">Signup</button>
    </form>
  );
}
