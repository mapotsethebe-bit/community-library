import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Books from './pages/Books.jsx';
import Transactions from './pages/Transactions.jsx';
import Users from './pages/Users.jsx';

const seedUsers = [{ id: 'u1', name: 'Admin', membershipId: 'ADMIN01', role: 'admin' }];
const seedBooks = [
  { id: 'b1', title: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'Fiction', isbn: '9780385474542', quantity: 4 },
  { id: 'b2', title: 'Mine Boy', author: 'Peter Abrahams', genre: 'Fiction', isbn: '9780435900823', quantity: 1 },
];

export default function App() {
  const [books, setBooks] = useLocalStorage('lib_books', seedBooks);
  const [users, setUsers] = useLocalStorage('lib_users', seedUsers);
  const [transactions, setTransactions] = useLocalStorage('lib_transactions', []);
  const [currentUser, setCurrentUser] = useLocalStorage('lib_session', null);

  if (!currentUser) {
    return <Login users={users} onLogin={setCurrentUser} />;
  }

  return (
    <HashRouter>
      <Navbar user={currentUser} onLogout={() => setCurrentUser(null)} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Dashboard books={books} />} />
          <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                setBooks={setBooks}
                transactions={transactions}
                setTransactions={setTransactions}
                user={currentUser}
              />
            }
          />
          <Route
            path="/users"
            element={<Users users={users} setUsers={setUsers} currentUser={currentUser} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
