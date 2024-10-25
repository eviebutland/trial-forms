export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/book" className="text-blue-900">
            Book a stay with us
          </a>
        </li>
        <li>
          <a href="/login" className="text-green-900">
            Login
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
