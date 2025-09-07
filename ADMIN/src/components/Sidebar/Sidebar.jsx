import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" className="sidebar-link">
            Mahsulotlar
          </Link>
        </li>
        <li>
          <Link to="/orders" className="sidebar-link">
            Buyurtmalar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;