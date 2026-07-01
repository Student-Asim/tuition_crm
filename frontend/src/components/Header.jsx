function Header({ setSidebarOpen }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <h2 className="header-title">Tuition Management CRM</h2>
      </div>
    </header>
  );
}

export default Header;