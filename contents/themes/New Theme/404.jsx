const $404 = () => {
  const [state, setState] = React.useState(0);
  return (
    <div>
      <h1>404 page not found</h1>
      <button onClick={() => setState(state + 1)}>{state}</button>
    </div>
  );
};

// Render dom
ReactDOM.render(<$404 />, window.document.getElementById("root"));
