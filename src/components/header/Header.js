import { BrowserRouter, Link, Route } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Header.scss";
export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="To DO List" />
      <nav>
        <Link to="/" className="nav-link">
          Inbox
        </Link>
        <Link to="/today" className="nav-link">
          Today
        </Link>
      </nav>
    </header>
  );
};
