import "./heder1.css";

const Navbar1 = () => {
  return (
    <header className="navbar">
      <div className="navbar1">
      <nav className="nav-links">
        <div className="nav-item">
          <a href="#" className="active">Home ▾</a>
          <div className="dropdown">
            <a href="#">Home 1</a>
            <a href="#">Home 2</a>
            <a href="#">Home 3</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#">About Us</a>
        </div>

        <div className="nav-item">
          <a href="#">Pages ▾</a>
          <div className="dropdown">
            <a href="#">About</a>
            <a href="#">FAQ</a>
            <a href="#">Pricing</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#">Shop ▾</a>
          <div className="dropdown">
            <a href="#">Products</a>
            <a href="#">Cart</a>
            <a href="#">Checkout</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#">Blog ▾</a>
          <div className="dropdown">
            <a href="#">Blog Grid</a>
            <a href="#">Blog Details</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#">Contact Us</a>
        </div>
      </nav>

      <button className="btn">Get In Touch</button>
      </div>
    </header>
  );
};

export default Navbar1;
