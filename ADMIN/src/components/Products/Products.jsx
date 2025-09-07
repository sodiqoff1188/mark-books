// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // storage o'chirildi
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    rating: '',
    oldPrice: '',
    newPrice: '',
    discount: '',
    description: '',
    imageUrl: '', // input type="file" o'rniga URL saqlash uchun
  });

  const productsCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setError(null);
    } catch (err) {
      console.error("Mahsulotlar yuklanmadi. Xato:", err);
      setError("Mahsulotlar yuklanmadi. Iltimos, keyinroq urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        rating: product.rating,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
        discount: product.discount,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    } else {
      clearForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearForm();
    setCurrentProduct(null);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      category: '',
      rating: '',
      oldPrice: '',
      newPrice: '',
      discount: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        rating: Number(formData.rating),
        oldPrice: Number(formData.oldPrice),
        newPrice: Number(formData.newPrice),
        discount: Number(formData.discount),
        description: formData.description,
        imageUrl: formData.imageUrl,
        createdAt: serverTimestamp(),
      };
      await addDoc(productsCollectionRef, productData);
      getProducts();
      handleCloseModal();
    } catch (err) {
      console.error("Mahsulot qo'shishda xatolik yuz berdi:", err);
      setError("Mahsulot qo'shishda xatolik yuz berdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const productDoc = doc(db, 'products', currentProduct.id);
      const newFields = {
        name: formData.name,
        category: formData.category,
        rating: Number(formData.rating),
        oldPrice: Number(formData.oldPrice),
        newPrice: Number(formData.newPrice),
        discount: Number(formData.discount),
        description: formData.description,
        imageUrl: formData.imageUrl,
      };
      await updateDoc(productDoc, newFields);
      getProducts();
      handleCloseModal();
    } catch (err) {
      console.error("Mahsulotni yangilashda xatolik yuz berdi:", err);
      setError("Mahsulotni yangilashda xatolik yuz berdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        getProducts();
      } catch (err) {
        console.error("Mahsulotni o'chirishda xatolik yuz berdi:", err);
        setError("Mahsulotni o'chirishda xatolik yuz berdi.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Mahsulotlar yuklanmoqda...</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Mahsulotlar</h1>
        <button className="add-button" onClick={() => handleOpenModal()}>
          + Mahsulot qo'shish
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className="products-list">
        {products.length === 0 ? (
          <p className="no-products">Hozircha mahsulotlar mavjud emas.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>Nomi</th>
                <th>Narxi</th>
                <th>Kategoriya</th>
                <th>Reyting</th>
                <th>Chegirma</th>
                <th>Harakatlar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.name}</td>
                  <td>
                    <span className="old-price">${product.oldPrice}</span>{' '}
                    <span className="new-price">${product.newPrice}</span>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.rating} ★</td>
                  <td>{product.discount}%</td>
                  <td className="actions-cell">
                    <button className="edit-button" onClick={() => handleOpenModal(product)}>
                      Tahrirlash
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(product.id)}>
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{isEditing ? 'Mahsulotni tahrirlash' : "Yangi mahsulot qo'shish"}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
              <div className="form-group">
                <label>Nomi:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Kategoriya:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reyting (1-5):</label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>Eski narxi ($):</label>
                <input
                  type="number"
                  name="oldPrice"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Yangi narxi ($):</label>
                <input
                  type="number"
                  name="newPrice"
                  step="0.01"
                  value={formData.newPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Chegirma (%):</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Tavsif:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Rasm URL manzilini kiriting:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Kiritilgan rasm" className="current-image" />
                )}
              </div>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Yuklanmoqda...' : isEditing ? 'Yangilash' : "Qo'shish"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;