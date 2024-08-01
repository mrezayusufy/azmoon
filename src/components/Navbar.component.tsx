import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Optional: for styling
import { useQuestionStore } from '../store';

export const Navbar = () => {
  const {code} = useQuestionStore()
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/introduction">
            معرفی تیم
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to={code.length === 0 ? "/#" : "/question"} >
            سوالات
          </Link> 
        </li>
        <li className={styles.navItem}>
          <Link to="/scores">
            نمرات تیم
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/host-introduction">
            معرفی میزبان
          </Link>
        </li>
      </ul>
    </nav>
  );
};
 
