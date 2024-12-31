import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const Categories = () => {

  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Trigger the animation when element is in view
        } else {
          setInView(false); // Optionally reset if out of view
        }
      },
      {
        threshold: 0.5, // Trigger animation when 50% of the element is in view
      }
    );

    // Get the target element
    const element = document.querySelector('#scrollSection');
    if (element) {
      observer.observe(element); // Start observing the element
    }

    // Cleanup observer on unmount
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const categoryItems = [
    {
      id: 1,
      title: 'Main Dish',
      des: '(86 dishes)',
      image: '../../../../public/images/home/category/img1.png',
    },
    {
      id: 2,
      title: 'Break Fast',
      des: '(12 break fast)',
      image: '../../../../public/images/home/category/img2.png',
    },
    {
      id: 3,
      title: 'Dessert',
      des: '(48 dessert)',
      image: '../../../../public/images/home/category/img3.png',
    },
    {
      id: 4,
      title: 'Browse All',
      des: '(255 Items)',
      image: '../../../../public/images/home/category/img4.png',
    },
  ];
  return (
    <div className="section-container py-16">
    {/* title */}
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h3 className="title">Popular Catagories</h3>
      </div>
      {/* category cards */}
       <motion.section
      id="scrollSection"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'} // Trigger animation when in view
      exit="hidden" // Optional: for exit animations (if you're using a routing library like React Router)
    >
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center">
      
        {categoryItems.map((item, i) => (
          
          <motion.div variants={{hidden: {opacity: 0}, show: {opacity: 1}}} key={i} className="shadow-md rounded-lg bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all">
            <div className="flex w-full mx-auto justify-center items-center">
              <img src={item.image} alt="" className="bg-[#c1f1c6] p-5 rounded-full w-28 h-28 "/>
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </motion.div>
          
        ))}
        
      </div>
      </motion.section>
    </div>
  );
};

export default Categories;
