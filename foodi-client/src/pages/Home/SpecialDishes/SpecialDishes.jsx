import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cards from '../../../components/Cards';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
('react-icons/fa6');

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  // Updated to PascalCase
  const SimpleNewArrow = props => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'red' }}
        onClick={onClick}
      >
        prev
      </div>
    );
  };

  const SimplePrevArrow = props => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
      >
        next
      </div>
    );
  };

  useEffect(() => {
    fetch('/menu.json')
      .then(res => res.json())
      .then(data => {
        const specials = data.filter(item => item.category === 'popular');
        setRecipes(specials);
      });
  }, []);

  // settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SimpleNewArrow />, // Updated reference
    backArrow: <SimplePrevArrow />, // Updated reference
  };

  return (
    <div className="section-container py-16 relative">
      {/* title */}
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h3 className="title md:w-[520px]">Standout Dishes From Our Menu</h3>
      </div>

      {/* arrow btn next & back */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5 "
        >
          <FaAngleLeft className="w-8 h-8 p-1"></FaAngleLeft>
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-green"
        >
          <FaAngleRight className="w-8 h-8 p-1"></FaAngleRight>
        </button>
      </div>

      {/* slider */}
      <Slider 
        ref={slider}
        {...settings}
        className="overflow-hidden mt-10 space-x-5 "
      >
        {recipes.map((item, i) => (
          <Cards key={i} item={item}></Cards>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;