
import React from 'react'
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { GiSpellBook } from "react-icons/gi";

import './Heder.css' // Agar style fayling bo‘lsa


const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="hader">
          <div className="header-logo-book">
            <GiSpellBook />
            <div className="logo-text">
              <h2>Bookland</h2>
              <p>Book Store Website</p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <select>
            <option>Choose Cate</option>
            <option>Science</option>
            <option>History</option>
            <option>Programming</option>
          </select>
          <input type="text" placeholder="Search Books Here" />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>


        {/* Icons */}
        <div className="icons">
          <div className="icon">
            <FaHeart />
          </div>
          <div className="icon">
            <FaShoppingCart />
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="profile"
          />
        </div>
      </header>
    </div>
  )
}

export default Header

