export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/book" className="bg-red-900">
            Book a stay with us
          </a>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
    </div>
  );
}

export default App;
