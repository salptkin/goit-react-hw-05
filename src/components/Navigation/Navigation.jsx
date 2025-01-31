import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
