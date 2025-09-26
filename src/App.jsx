import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Firebase konfiguratsiya faylingiz

// Sizning komponentlaringizni import qilish
import SimpleSlider from './UIcomponents/secgtion1/SectionSlider';
import Productmodal from './UIcomponents/Section2/Section2';
import Navbar1 from './UIcomponents/heder1/Heder1';
import RecommendedProducts from './UIcomponents/Recomended/Recomended';
import HappyCustomers from './UIcomponents/Happy Customers/Happ';
import Header from './UIcomponents/heder/Heder';
import Slider from './UIcomponents/toke/Toke';
import FoteerComp from './UIcomponents/Footer-comp/Footer-comp';
import Recommender from './UIcomponents/Recomendatsiya/Recomender';
import Comments from './UIcomponents/Comments/Comments';

// CSS importi
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  // Loaderni boshqaruvchi holat qayta tiklandi
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firebase'dan mahsulotlarni yuklash
        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsData = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(productsData);

        // Firebase'dan sharhlarni (comments) yuklash
        const commentsCollectionRef = collection(db, 'comments');
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        const commentsData = commentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setComments(commentsData);

        // Firebase'dan tavsiyalarni (recommendations) yuklash
        const recommendationsCollectionRef = collection(db, 'recommendations');
        const recommendationsSnapshot = await getDocs(recommendationsCollectionRef);
        const recommendationsData = recommendationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setRecommendations(recommendationsData);

        // Barcha ma'lumotlar yuklangach, loaderni o'chirish
        setIsLoading(false);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xato yuz berdi:", error);
        setIsLoading(false); // Xato yuz bersa ham sahifani ko'rsatish
      }
    };
    fetchData();
  }, []);

  // Agar ma'lumotlar yuklanayotgan bo'lsa (true), faqat loader ko'rinadi
  if (isLoading) {
    return (
      // Loaderni markazga joylash uchun kerakli CSS klassini ishlating
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
        <div className="loader"></div> 
        {/* 'loader' klassini o'zingizning 'App.css' faylingizda style qilgan bo'lishingiz kerak */}
      </div>
    );
  }

  // Ma'lumotlar yuklab bo'lingach, asosiy sahifa ko'rinadi
  return (
    <div>
      <Header />
      <Navbar1 />
      <Routes>
        <Route path="/" element={
          <>
            <Slider/>
            {/* Ma'lumotlarni prop sifatida yuboramiz */}
            <SimpleSlider products={products} />
            <Productmodal />
            <RecommendedProducts recommendations={recommendations} />
            <Comments comments={comments} />
            <Recommender/>
            <HappyCustomers/>
            <FoteerComp/>
          </>
        } />
        {/* Boshqa route'lar... */}
        <Route path="/slider" element={<Slider/>} />
        <Route path="/section1" element={<SimpleSlider products={products}/>} />
        <Route path="/product-modal" element={<Productmodal/>} />
        <Route path="/recommended" element={<RecommendedProducts recommendations={recommendations} />} />
        <Route path="/comments" element={<Comments comments={comments} />} />
        <Route path="/recommender" element={<Recommender/>} />
        <Route path="/happy-customers" element={<HappyCustomers/>} />
        <Route path="/footer" element={<FoteerComp/>} />
        <Route path="*" element={<h2>404 Sahifa topilmadi</h2>} />
      </Routes>
    </div>
  );
};

export default App;