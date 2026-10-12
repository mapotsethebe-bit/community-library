import { useState } from 'react';
import UserForm from '../components/UserForm.jsx';

export default function Users({ users, setUsers, currentUser }) {
  const [editing, setEditing] = useState(null);

  if (currentUser.role !== 'admin') {
    return <p className="alert">Only admins can manage users.</p>;
  }

  const add = (data) => setUsers([...users, { ...data, id: crypto.randomUUID() }]);
  const update = (data) => {
    setUsers(users.map((u) => (u.id === data.id ? data : u)));
    setEditing(null);
  };
  const remove = (user) => {
    if (user.id === currentUser.id) return window.alert('You cannot delete the account you are logged in with.');
    if (window.confirm(`Delete ${user.name}?`)) setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <>
      <h2>User management</h2>
      <div className="split">
        <UserForm
          initial={editing}
          existing={users}
          onSubmit={editing ? update : add}
          onCancel={() => setEditing(null)}
        />
        <div className="scroll">
          <table>
            <thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td><td>{u.membershipId}</td><td>{u.role}</td>
                  <td className="row">
                    <button className="btn small" onClick={() => setEditing(u)}>Update</button>
                    <button className="btn small danger" onClick={() => remove(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
