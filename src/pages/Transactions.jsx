import { useState } from 'react';
import Field from '../components/Field.jsx';

export default function Transactions({ books, setBooks, transactions, setTransactions, user }) {
  const [form, setForm] = useState({ bookId: '', type: 'borrow', quantity: 1 });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const book = books.find((b) => b.id === form.bookId);
    const qty = Number(form.quantity);
    if (!book) return setError('Choose a book.');
    if (!Number.isInteger(qty) || qty < 1) return setError('Quantity must be a whole number, 1 or more.');
    if (form.type === 'borrow' && qty > book.quantity)
      return setError(`Only ${book.quantity} cop${book.quantity === 1 ? 'y' : 'ies'} of this book in stock.`);

    const delta = form.type === 'add' ? qty : -qty;
    setBooks(books.map((b) => (b.id === book.id ? { ...b, quantity: b.quantity + delta } : b)));
    setTransactions([
      { id: crypto.randomUUID(), date: new Date().toLocaleString(), title: book.title, type: form.type, quantity: qty, by: user.name },
      ...transactions,
    ]);
    setError('');
    setForm({ ...form, quantity: 1 });
  };

  return (
    <>
      <h2>Transactions</h2>
      <form className="card form inline" onSubmit={submit} noValidate>
        <Field label="Book">
          <select name="bookId" value={form.bookId} onChange={change}>
            <option value="">Select a book</option>
            {books.map((b) => <option key={b.id} value={b.id}>{b.title} ({b.quantity})</option>)}
          </select>
        </Field>
        <Field label="Action">
          <select name="type" value={form.type} onChange={change}>
            <option value="borrow">Borrow (deduct stock)</option>
            <option value="add">New stock (add)</option>
          </select>
        </Field>
        <Field label="Quantity">
          <input name="quantity" type="number" min="1" value={form.quantity} onChange={change} />
        </Field>
        <button className="btn" type="submit">Record transaction</button>
        {error && <small className="error">{error}</small>}
      </form>

      <h3>History</h3>
      <div className="scroll">
        <table>
          <thead><tr><th>Date</th><th>Book</th><th>Action</th><th>Qty</th><th>Recorded by</th></tr></thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td><td>{t.title}</td>
                <td>{t.type === 'add' ? 'Stock added' : 'Borrowed'}</td><td>{t.quantity}</td><td>{t.by}</td>
              </tr>
            ))}
            {transactions.length === 0 && <tr><td colSpan="5" className="muted">No transactions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
