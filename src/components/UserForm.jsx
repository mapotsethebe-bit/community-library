import { useState, useEffect } from 'react';
import Field from './Field.jsx';

const empty = { name: '', membershipId: '', role: 'member' };

export default function UserForm({ initial, existing, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || empty);
    setErrors({});
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = 'Enter the name.';
    if (!form.membershipId.trim()) found.membershipId = 'Enter the membership ID.';
    else if (existing.some((u) => u.id !== form.id && u.membershipId.toLowerCase() === form.membershipId.trim().toLowerCase()))
      found.membershipId = 'This membership ID is already used.';
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({ ...form, name: form.name.trim(), membershipId: form.membershipId.trim() });
    if (!initial) setForm(empty);
  };

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h3>{initial ? 'Update user' : 'Add a user'}</h3>
      <Field label="Name" error={errors.name}><input name="name" value={form.name} onChange={change} /></Field>
      <Field label="Membership ID" error={errors.membershipId}>
        <input name="membershipId" value={form.membershipId} onChange={change} />
      </Field>
      <Field label="Role">
        <select name="role" value={form.role} onChange={change}>
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <div className="row">
        <button className="btn" type="submit">{initial ? 'Save changes' : 'Add user'}</button>
        {initial && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
