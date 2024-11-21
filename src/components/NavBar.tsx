import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>aura analyzer</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.navLink}>home</Link></li>
        <li><Link to="/about" className={styles.navLink}>about</Link></li>
        <li><Link to="/results" className={styles.navLink}>results</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
