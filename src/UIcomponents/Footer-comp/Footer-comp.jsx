import React from 'react'
import "./Footer-comp.css"
import { FaBookOpen } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const FoteerComp = () => {
  return (
    <div>
        <div className="footer">
            <ul className='uls'>
                <div className="logo">
                    <div className="imgs">
                          <FaBookOpen style={{fontSize:'40px', color:'orange'}}/>
                    </div>
                    <div className="texx">
                        <h1>Book <span style={{color: 'orange'}}>Land</span></h1>
                        <p>Book Store Website</p>
                    </div>
                </div>
                <p style={{marginTop:'10px', lineHeight:'30px'}}>Bookland is a Book Store Ecommerce Website Template by 
                    DexignZone lorem ipsum dolor sit</p>
                    <div className="icons" style={{marginTop:'10px'
                    }}>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagramSquare />
                    </div>
            </ul>
            <ul>
                <h1>Our Links</h1>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privace Policey</li>
                <li>Pricing</li>
                <li>Faq's</li>
            </ul>
            <ul>
                <h1>BOOKLAND</h1>
                <li>Blog</li>
                <li>Shop</li>
                <li>Checkout</li>
                <li>Cart</li>
                <li>Wishlist</li>
            </ul>
            <ul>
                <h1>Resources</h1>
                <li>Home</li>
                <li>Features</li>
                <li>Blog Grid</li>
                <li>Help Desk</li>
                <li>My Acoount</li>
            </ul>
            <ul>
                <h1>Get in Touch With Us</h1>
                <li>832 Thompson Drive, San Fransico CA 94107, Us</li>
                <li>+123 345 123 556</li>
                <li>+123 345 123 556</li>
                <li>support@Bookland.id info@bookland.id</li>
            </ul>
     </div>
    </div>
  )
}

export default FoteerComp