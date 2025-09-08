import React from 'react';
import './Happy Customers.css';
import { IoMdContacts } from "react-icons/io";
import { FaCar } from "react-icons/fa"; // mashina icon

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="stat-card">
      <div className="icon-container">
        {icon}
      </div>
      <p className="stat-number">{number}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
};

export default StatCard;
