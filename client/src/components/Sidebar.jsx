import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  FiHome, 
  FiCpu, 
  FiRefreshCw, 
  FiEdit3, 
  FiMessageSquare, 
  FiLogOut 
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'AI Generator', path: '/generator', icon: <FiCpu /> },
    { name: 'Converter', path: '/converter', icon: <FiRefreshCw /> },
    { name: 'Editor', path: '/editor', icon: <FiEdit3 /> },
    { name: 'AI Assistant', path: '/assistant', icon: <FiMessageSquare /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h2 className="gradient-text">DocVerse AI</h2>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => 
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className={styles.userName}>{user?.name}</span>
        </div>
        <button onClick={logout} className={styles.logoutBtn}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
