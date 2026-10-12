import { useState, useEffect } from 'react';
import Field from './Field.jsx';

const empty = { title: '', author: '', genre: '', isbn: '', quantity: '' };

function validate(f) {
  const e = {};
  if (!f.title.trim()) e.title = 'Enter the title.';
  if (!f.author.trim()) e.author = 'Enter the author.';
  if (!f.genre.trim()) e.genre = 'Enter the genre.';
  if (!/^(\d{10}|\d{13})$/.test(f.isbn.replace(/-/g, ''))) e.isbn = 'ISBN must be 10 or 13 digits.';
  if (f.quantity === '' || !Number.isInteger(Number(f.quantity)) || Number(f.quantity) < 0)
    e.quantity = 'Quantity must be a whole number, 0 or more.';
  return e;
}

export default function BookForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});

  // Reset the form whenever a different book is selected for editing.
  useEffect(() => {
    setForm(initial || empty);
    setErrors({});
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({ ...form, isbn: form.isbn.replace(/-/g, ''), quantity: Number(form.quantity) });
    if (!initial) setForm(empty);
  };

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h3>{initial ? 'Update book' : 'Add a book'}</h3>
      <Field label="Title" error={errors.title}><input name="title" value={form.title} onChange={change} /></Field>
      <Field label="Author" error={errors.author}><input name="author" value={form.author} onChange={change} /></Field>
      <Field label="Genre" error={errors.genre}><input name="genre" value={form.genre} onChange={change} /></Field>
      <Field label="ISBN" error={errors.isbn}><input name="isbn" value={form.isbn} onChange={change} /></Field>
      <Field label={initial ? 'Quantity in stock' : 'Initial quantity'} error={errors.quantity}>
        <input name="quantity" type="number" min="0" value={form.quantity} onChange={change} />
      </Field>
      <div className="row">
        <button className="btn" type="submit">{initial ? 'Save changes' : 'Add book'}</button>
        {initial && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
