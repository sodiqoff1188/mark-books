import "./heder1.css";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <header className="navbar">
      <div className="navbar1">
        <nav className="nav-links">
          <div className="nav-item">
            {/* Home linki */}
            <Link to="/" className="active">Home</Link>
            {/* <div className="dropdown">
              <Link to="/home1">Home 1</Link>
              <Link to="/home2">Home 2</Link>
              <Link to="/home3">Home 3</Link>
            </div> */}
          </div>

          <div className="nav-item">
            {/* About Us linki */}
            <Link to="/about-us">About Us</Link>
          </div>

          <div className="nav-item">
            {/* Pages linki */}
            <Link to="/pages">Pages</Link>
            {/* <div className="dropdown">
              <Link to="/about-us">About</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/pricing">Pricing</Link>
            </div> */}
          </div>

          <div className="nav-item">
            {/* Shop linki */}
            <Link to="/shop">Shop </Link>
            {/* <div className="dropdown">
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/checkout">Checkout</Link>
            </div> */}
          </div>

          <div className="nav-item">
            {/* Blog linki */}
            <Link to="/blog">Blog </Link>
            {/* <div className="dropdown">
              <Link to="/blog-grid">Blog Grid</Link>
              <Link to="/blog-details">Blog Details</Link>
            </div> */}
          </div>

          <div className="nav-item">
            {/* Contact Us linki */}
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </nav>

        <button className="btn">Get In Touch</button>
      </div>
    </header>
  );
};

export default Navbar1;