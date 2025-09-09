import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Section2.css'; // Bu fayl nomi o'zgarmadi, chunki siz shunday so'radingiz.
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

// Reytingni ikonalar bilan ko'rsatish funksiyasi
const renderRatingStars1 = (rating1) => {
  const stars1 = [];
  const fullStars1 = Math.round(rating1);
  for (let i1 = 0; i1 < 5; i1++) {
    if (i1 < fullStars1) {
      stars1.push(<FaStar key={i1} />);
    } else {
      stars1.push(<FaRegStar key={i1} />);
    }
  }
  return stars1;
};


const SectionSlider1 = () => {
  const [products1, setProducts1] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const sliderRef1 = useRef(null);

  useEffect(() => {
    const getProducts1 = async () => {
      try {
        const productsCollectionRef1 = collection(db, 'products');
        const data1 = await getDocs(productsCollectionRef1);
        const productsData1 = data1.docs.map(doc1 => ({ ...doc1.data(), id: doc1.id }));
        setProducts1(productsData1);
        setLoading1(false);
      } catch (error) {
        console.error("Mahsulotlarni olishda xato:", error);
        setLoading1(false);
      }
    };
    getProducts1();
  }, []);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Default tugmalarni o'chiramiz
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  if (loading1) {
    return <div className="slider-loading1"></div>;
  }

  return (
    <div className="slider-wrapper1">
      <div className="section-header-content-one">
        <div className="slider-header-container1">
          <h2 className="slider-header-title1">Tanlangan mahsulot</h2>
          <p>O'quvchi uning tartibini ko'rib chiqayotganda, sahifaning o'qish mumkin bo'lgan tarkibiga chalg'itishi uzoq vaqtdan beri aniqlangan haqiqatdir. Lorem Ipsumdan foydalanishning nuqtasi shundaki, u ko'proq yoki kamroq normalga ega.</p>
        </div>
      </div>

      {/* Asosiy mahsulotlar slayderi */}
      {products1.length > 0 ? (
        <Slider {...settings1} ref={sliderRef1} className="product-slider1">
          {products1.map(product1 => (
            <div key={product1.id} className="product-card-container1">
              <div className="product-card1">
                <div className="card-image-container1">
                  <img src={product1.imageUrl} alt={product1.name} className="product-image1" />
                </div>
                <div className="card-content1">
                  <h1 className="product-name1">{product1.name}</h1>
                  <p className="product-category1">{product1.category}</p>
                  <div className="product-rating1">
                    <h3> {renderRatingStars1(product1.rating)}</h3>
                    <span>({product1.rating})</span>
                  </div>
                  <div className="product-prices1">
                    <span className="old-price1">$ {product1.oldPrice}</span>
                    <span className="new-price1">$ {product1.newPrice}</span>
                  </div>


                  <div className="Section1-datails-and-cart-buttons">
                    <Link><button className="Section-card-button1_1">Add To Cart</button></Link>
                    <Link><button className="Section-card-button1_2">See Datails</button></Link>
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="no-products1">Hozircha mahsulotlar mavjud emas.</p>
      )}
    </div>
  );
};

export default SectionSlider1;