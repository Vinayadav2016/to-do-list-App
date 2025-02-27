import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Header.scss";
import { useContext } from "react";
import { TaskContext } from "../../App.js";
export const Header = () => {
  const { setSelectedUser } = useContext(TaskContext);
  return (
    <header className="header">
      <Link
        to="/"
        className="logo-container"
        onClick={() => setSelectedUser(undefined)}
      >
        <img src={logo} alt="To DO List" />
        To DO APP
      </Link>

      <nav>
        <Link
          to="/today"
          className="nav-link"
          onClick={() => {
            setSelectedUser(undefined);
          }}
        >
          Today
        </Link>
        <Link
          to="/tomorrow"
          className="nav-link"
          onClick={() => {
            setSelectedUser(undefined);
          }}
        >
          Tomorrow
        </Link>
      </nav>
    </header>
  );
};
