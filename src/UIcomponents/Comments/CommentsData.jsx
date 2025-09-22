// src/data/commentsData.js

import image01 from '../../assets/img01.png'; // Rasm yo'li
import image02 from '../../assets/img02.png'; // Rasm yo'li
import image03 from '../../assets/img03.png'; // Rasm yo'li

const commentsData = [
  {
    id: 1,
    rating: 3.5,
    text: "Juda zoʻr interaktiv doʻkon. DTM testlariga tayyorgarlik qilish uchun katta yordam beradi.",
    name: "Ali Sodiqov",
    role: "Muallif",
    image: image01,
  },
  {
    id: 2,
    rating: 4.0,
    text: "Ajoyib platforma! Foydalanish juda qulay va interfeysi sodda.",
    name: "Guli Ergasheva",
    role: "Oʻquvchi",
    image: image03,
  },
  {
    id: 3,
    rating: 5.0,
    text: "Eng yaxshi onlayn resurslardan biri. Ma'lumotlar juda aniq.",
    name: "Jasur Rixsiyev",
    role: "Talaba",
    image: image02,
  },
];

export default commentsData;