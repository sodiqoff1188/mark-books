import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './recomended.css';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { db } from '../firebase'; // Fayl manzilini tekshiring
import { collection, getDocs } from 'firebase/firestore';

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error("Mahsulotlarni olishda xato yuz berdi: ", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  if (loading) {
    return <div className="loading-state"></div>;
  }

  return (
    <section className="recommended-section">
      <div className="sections-recomendet-products">
        <div className="slider-header-container">
          <h2 className="slider-header-title">Sizga tavsiya etamiz</h2>
          <div className="slider-controls">
            <button className="slider-arrow-button prev-arrow" onClick={() => sliderRef.current.slickPrev()}>
              <FaChevronLeft />
            </button>
            <button className="slider-arrow-button next-arrow" onClick={() => sliderRef.current.slickNext()}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="divider"></div>

        {products.length > 0 ? (
          <Slider {...settings} ref={sliderRef} className="products-container product-slider">
            {products.map(product => (
              <div key={product.id} className="product-card-container">
                <div className="product-card">
                  <img src={product.img} alt={product.title} className="product-image" />
                  <h3 className="product-title">{product.title}</h3>
                  {product.subtitle && <p className="product-subtitle">{product.subtitle}</p>}
                  <div className="product-price">
                    {product.originalPrice ? (
                      <>
                        <span className="current-price">${product.price}</span>
                        <span className="original-price">${product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">
                    <AiOutlineShoppingCart className="cart-icon" size={20} />
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-products">Hozircha tavsiya qilingan mahsulotlar mavjud emas.</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedProducts;