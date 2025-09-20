// src/pages/Details/Details.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams hook'ini import qilish
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './Details.css';
import { FaStar, FaRegStar } from "react-icons/fa";

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

const Details = () => {
  const { id } = useParams(); // URL'dan ID'ni olish
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Mahsulot topilmadi!");
          setProduct(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Mahsulotni olishda xato:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]); // ID o'zgarganda funksiyani qayta ishga tushirish

  if (loading) {
    return <div className="details-loading">Mahsulot yuklanmoqda...</div>;
  }

  if (!product) {
    return <div className="details-not-found">Mahsulot topilmadi.</div>;
  }

  return (
    <div className="details-page-container">
      <div className="details-product-card">
        <div className="details-image-wrapper">
          <img src={product.imageUrl} alt={product.name} className="details-product-image" />
        </div>
        <div className="details-info-container">
          <h1 className="details-product-name">{product.name}</h1>
          <p className="details-product-category">{product.category}</p>
          <div className="details-rating">
            {renderRatingStars(product.rating)}
            <span>({product.rating})</span>
          </div>
          <p className="details-product-description">{product.description}</p>
          <div className="details-prices">
            <span className="details-old-price">${product.oldPrice}</span>
            <span className="details-new-price">${product.newPrice}</span>
            <span className="details-discount">{product.discount}% OFF</span>
          </div>
          <div className="details-buttons">
            <button className="details-add-to-cart">Savatga qo'shish</button>
            <button className="details-buy-now">Sotib olish</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Details;