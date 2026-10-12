import { useState } from 'react';
import BookForm from '../components/BookForm.jsx';

export default function Books({ books, setBooks }) {
  const [editing, setEditing] = useState(null);

  const add = (data) => setBooks([...books, { ...data, id: crypto.randomUUID() }]);
  const update = (data) => {
    setBooks(books.map((b) => (b.id === data.id ? data : b)));
    setEditing(null);
  };
  const remove = (book) => {
    if (window.confirm(`Delete "${book.title}"?`)) setBooks(books.filter((b) => b.id !== book.id));
  };

  return (
    <>
      <h2>Book management</h2>
      <div className="split">
        <BookForm
          initial={editing}
          onSubmit={editing ? update : add}
          onCancel={() => setEditing(null)}
        />
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Qty</th><th></th></tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td><td>{b.author}</td><td>{b.genre}</td><td>{b.isbn}</td><td>{b.quantity}</td>
                  <td className="row">
                    <button className="btn small" onClick={() => setEditing(b)}>Update</button>
                    <button className="btn small danger" onClick={() => remove(b)}>Delete</button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && <tr><td colSpan="6" className="muted">No books in the catalogue.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
