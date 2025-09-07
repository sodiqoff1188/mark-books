import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase'dan db obyektini import qilish
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import './Dashboard.css'; // Dashboard uchun stil fayli

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Mahsulotlar sonini olish
        const productsCollectionRef = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollectionRef);
        setProductCount(productSnapshot.docs.length);

        // 2. Oxirgi qo'shilgan 5 ta mahsulotni olish
        const latestProductsQuery = query(
          productsCollectionRef,
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const latestProductsSnapshot = await getDocs(latestProductsQuery);
        const latestProductsData = latestProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestProducts(latestProductsData);

        setLoading(false);
      } catch (err) {
        console.error('Ma\'lumotlarni olishda xatolik:', err);
        setError('Ma\'lumotlarni yuklashda xatolik yuz berdi. Konsolni tekshiring.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Ma'lumotlar yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      {/* Statistika kartochkalari */}
      <div className="stats-cards">
        <div className="card product-card">
          <div className="card-icon">🛍️</div>
          <h2>Mahsulotlar soni</h2>
          <p className="card-value">{productCount}</p>
        </div>
        <div className="card order-card">
          <div className="card-icon">📦</div>
          <h2>Buyurtmalar</h2>
          <p className="card-value">0</p>
        </div>
        <div className="card user-card">
          <div className="card-icon">👤</div>
          <h2>Foydalanuvchilar</h2>
          <p className="card-value">0</p>
        </div>
      </div>

      {/* So'nggi qo'shilgan mahsulotlar jadvali */}
      <div className="latest-products-section">
        <h2>So'nggi Mahsulotlar</h2>
        {latestProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Narxi</th>
                <th>Kategoriya</th>
                <th>Qo'shilgan sana</th>
              </tr>
            </thead>
            <tbody>
              {latestProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.createdAt?.toDate().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Hali hech qanday mahsulot qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;