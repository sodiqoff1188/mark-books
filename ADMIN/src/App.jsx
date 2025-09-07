import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; // Sidebar komponentini import qilish
import './App.css'; // Asosiy stil fayli
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';

// Kelajakda yaratiladigan sahifalar komponentlari
// Hozircha joy tutuvchi komponentlar sifatida ko'rsatilgan

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> 
        <div className="content-container">
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/products' element={<Products/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;