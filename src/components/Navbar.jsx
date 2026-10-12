import { NavLink } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="nav">
      <strong className="brand">Community Library</strong>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <span className="who">
        {user.name} ({user.role})
        <button className="btn ghost" onClick={onLogout}>Log out</button>
      </span>
    </header>
  );
}
