// src/components/Comments/Comments.jsx

import React from 'react';
import Slider from 'react-slick';
import { HiOutlineStar } from "react-icons/hi";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Comments.css';
import commentsData from '../Comments/CommentsData'; // Ma'lumotni import qilish

// Yulduzchalarni dinamik ravishda render qilish uchun yordamchi funksiya
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<TiStarFullOutline key={`full-${i}`} />);
    }

    if (hasHalfStar) {
        stars.push(<TiStarHalfOutline key="half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<HiOutlineStar key={`empty-${i}`} />);
    }

    return stars;
};

const Comments = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='Comments-parent-container'>
            <h1>Sharxlar</h1>
            <div className="Comments-conteiner">
                <Slider {...settings} className="comments-contents">
                    {commentsData.map((comment) => (
                        <div key={comment.id} className="comments-card-wrapper">
                            <div className="comments-card">
                                <div className="rating-comments">
                                    {renderStars(comment.rating)}
                                </div>

                                <div className="commenting-text">
                                    <p>{comment.text}</p>
                                </div>

                                <div className="comments-profile">
                                    <img src={comment.image} alt={comment.name} />
                                    <div className="users-names-in-this">
                                        <h3>{comment.name}</h3>
                                        <h4>{comment.role}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Comments;