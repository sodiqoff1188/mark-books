import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./toke.css";

import img1 from "../../assets/image.png";
import img2 from "../../assets/image copy.png";
import img3 from "../../assets/image copy 2.png";

const slides = [
  {
    title: "TAKE OUT TANGO",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: "$40.00",
    oldPrice: "$50.00",
    img: img1,
  },
  {
    title: "HEAVY LIFT",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    price: "$60.00",
    oldPrice: "$70.00",
    img: img2,
  },
  {
    title: "MODERN STYLE",
    desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    price: "$80.00",
    oldPrice: "$100.00",
    img: img3,
  },
];

// Ranglar massivini tuzamiz
const colors = ["#ff4c29", "#2a9d8f", "#1d3557", "#f4a261", "#6a4c93"];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  };
  
  const nextSlide = () => {
    setIndex(index === slides.length - 1 ? 0 : index + 1);
  };

  return (
    <div className="slider-container">
      <button className="arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      <div className="slide">
        <div className="text" style={{ color: colors[index % colors.length] }}>
          <h2>{slides[index].title}</h2>
          <p>{slides[index].desc}</p>
          <div className="price">
            {slides[index].price}
            <span className="old">{slides[index].oldPrice}</span>
          </div>
          <button className="buy-btn">Buy Now</button>
        </div>

        <div className="image">
          <img src={slides[index].img} alt={slides[index].title} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
