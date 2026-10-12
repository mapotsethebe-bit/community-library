const LOW_STOCK = 2;

export default function Dashboard({ books }) {
  const low = books.filter((b) => b.quantity < LOW_STOCK);
  return (
    <>
      <h2>Book availability</h2>
      {low.length > 0 && (
        <p className="alert">Low stock: {low.map((b) => b.title).join(', ')}</p>
      )}
      {books.length === 0 ? (
        <p className="muted">No books yet. Add one on the Books page.</p>
      ) : (
        <div className="grid">
          {books.map((b) => (
            <article key={b.id} className={`card book ${b.quantity < LOW_STOCK ? 'low' : ''}`}>
              <h3>{b.title}</h3>
              <p>{b.author} · {b.genre}</p>
              <p className="muted">ISBN {b.isbn}</p>
              <p className="qty">{b.quantity} in stock{b.quantity < LOW_STOCK && ' (low)'}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
