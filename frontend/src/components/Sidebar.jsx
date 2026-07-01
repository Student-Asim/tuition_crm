import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Leads", path: "/leads" },
    { name: "Tutors", path: "/tutors" },
    { name: "Activities", path: "/activities" },
    { name: "Payments", path: "/payments" },
    { name: "Reminders", path: "/reminders" },
  ];

  return (
    <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <h2 className="sidebar-logo">Tuition CRM</h2>
        <button
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-menu">
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;