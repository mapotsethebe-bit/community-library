import { useState } from 'react';
import Field from '../components/Field.jsx';

export default function Login({ users, onLogin }) {
  const [name, setName] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.name.toLowerCase() === name.trim().toLowerCase() && u.membershipId.toLowerCase() === membershipId.trim().toLowerCase()
    );
    if (!user) return setError('Name and membership ID do not match any user.');
    onLogin(user);
  };

  return (
    <div className="login">
      <form className="card form" onSubmit={submit}>
        <h2>Community Library</h2>
        <p className="muted">Log in with your name and membership ID.</p>
        <Field label="Name"><input value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Membership ID"><input value={membershipId} onChange={(e) => setMembershipId(e.target.value)} /></Field>
        {error && <small className="error">{error}</small>}
        <button className="btn" type="submit">Log in</button>
           <div className="hint">
     <p>Demo admin login:</p>
     <p>Name: <strong>Admin</strong></p>
     <p>Membership ID: <strong>ADMIN01</strong></p>
   </div>
      </form>
    </div>
  );
}
