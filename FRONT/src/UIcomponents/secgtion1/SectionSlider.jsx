import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SectionSlider.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from "react-icons/fa";

// Reytingni ikonalar bilan ko'rsatish funksiyasi
const renderRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return stars;
};

const SectionSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const data = await getDocs(productsCollectionRef);
        const productsData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Mahsulotlarni olishda xato:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false, // Default tugmalarni o'chiramiz
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  if (loading) {
    return <div className="slider-loading">Mahsulotlar yuklanmoqda...</div>;
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-header-container">
        <h2 className="slider-header-title">Kitoblar sotuvda</h2>
        <div className="slider-controls">
          <button className="slider-arrow-button prev-arrow" onClick={() => sliderRef.current.slickPrev()}>
            <FaChevronLeft />
          </button>
          <div className="slider-dots-container">
            {/* Nuqtachalar bu yerda dinamik joylashadi */}
            <Slider {...settings} ref={sliderRef} className="hidden-slider">
              {/* Slider ichida faqat dots va tugmalar joylashuvi uchun bo'shlik */}
              <div></div>
            </Slider>
          </div>
          <button className="slider-arrow-button next-arrow" onClick={() => sliderRef.current.slickNext()}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Asosiy mahsulotlar slayderi */}
      {products.length > 0 ? (
        <Slider {...settings} ref={sliderRef} className="product-slider">
          {products.map(product => (
            <div key={product.id} className="product-card-container">
              <div className="product-card">
                <div className="card-image-container">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <span className="product-discount">{product.discount}% OFF</span>
                </div>
                <div className="card-content">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-rating-and-prices">
                    <div className="product-rating">
                      {renderRatingStars(product.rating)}
                      <span>({product.rating})</span>
                    </div>
                    <div className="product-prices">
                      <span className="old-price">${product.oldPrice}</span>
                      <span className="new-price">${product.newPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="no-products">Hozircha mahsulotlar mavjud emas.</p>
      )}
    </div>
  );
};

export default SectionSlider;