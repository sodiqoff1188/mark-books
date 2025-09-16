import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Slider from "react-slick"; // Slider komponentini import qilish
import './toke.css'; // CSS faylini import qildik

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        
        const loadedProducts = [];
        querySnapshot.forEach((doc) => {
          loadedProducts.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setProducts(loadedProducts);
      } catch (error) {
        console.error("Ma'lumotlarni o'qishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getProducts();
    
  }, []);

  if (loading) {
    return <div className="loading-state"></div>;
  }

  // Slider uchun sozlamalar (faqat bitta mahsulot ko'rsatilgan dizaynga moslab)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Har bir slayd faqat bitta mahsulotni ko'rsatadi
    slidesToScroll: 1,
    arrows: true, // O'qlarni ko'rsatish
    autoplay: true, // Avtomatik o'tish
    autoplaySpeed: 3000, // 3 soniyadan keyin o'tish
  };

  return (
    <div className="product-slider-wrapper"> {/* Umumiy o'rab turuvchi div */}
      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id} className="single-product-slide"> {/* Har bir slayd uchun karta */}
              {/* Chap qism: Detallar */}
              <div className="slide-details-section">
                <h1 className="slide-title">{product.name}</h1> {/* Buni product.name bilan almashtirishingiz mumkin */}
                <div className="slide-price-wrapper">
                  <span className="slide-current-price">${product.newPrice}</span>
                  {product.originalPrice && <span className="slide-original-price">${product.originalPrice}</span>}
                </div>
                <button className="slide-details-button">Tafsilotlarni qarang</button>
              </div>

              {/* O'ng qism: Rasm */}
              <div className="slide-image-section">
                <div className="slide-image-circle">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="slide-image"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="no-products">Hozircha mahsulotlar yo'q.</p>
      )}
    </div>
  );
}

export default ProductList;