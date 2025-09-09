import React from 'react';
import StatCard from './Happy Customers';
import { IoMdContacts } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { GiRaceCar } from "react-icons/gi";
import './Happy Customers.css';


const HappyCustomers = () => {
  return (
    <div className="stats-wrapper">
      <StatCard icon={<IoMdContacts />} number="10K+" label="Happy Customers" />
      <StatCard icon={<FaCar />} number="500+" label="Cars Sold" />
      <StatCard icon={<GiRaceCar />} number="120+" label="Race Drivers" />
    </div>
  );
};


export default HappyCustomers;
