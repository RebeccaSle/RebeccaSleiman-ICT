import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

    <span className="navbar-brand">Leave System</span>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/employee">Employee Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin Dashboard</Link>
        </li>
      </ul>
    </div>

  </nav>
);

export default Navbar;
