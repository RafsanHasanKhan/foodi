import { useEffect, useState } from 'react';
import Cards from './../../../components/Cards';
import { FaFilter } from 'react-icons/fa';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  // sorting
  const [sortOption, setSortOption] = useState('default');
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // loading data
  useEffect(() => {
    
    // step 1 fetch data form the backend normal fetch
    // fetch('/menu.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setMenu(data);
    //     setFilteredItems(data);
    // });

    // step 2 fetch data from the backend use async & await
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // filtering data based on category
  const filterItems = category => {
    const filtered =
      category === 'all'
        ? menu
        : menu.filter(item => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // sorting base on A-Z, Z-A, Low to High Pricing
  const handleSortChange = option => {
    setSortOption(option);
    console.log(option);
    let sortedItems = [...filteredItems];
    // logic
    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'low-to-high':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexofFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className=" bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-48 flex flex-col justify-center items-center gap-8">
        {/* text content */}
        <div className=" space-y-7 px-4 text-center">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            Dive into Delights Of Delectable{' '}
            <span className="text-green">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="btn bg-green px-8 py-3 font-semibold text-white hover:text-red rounded-full">
            Order Now
          </button>
        </div>
        {/* menu shop section */}
        <div className="max-w-screen-2xl container mx-auto xl:px-14 px-4">
          {/* filtering and sorting */}
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
            {/* all category btn */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap my-12">
              <button
                onClick={showAll}
                className={selectedCategory === 'all' ? 'activeTab' : ''}
              >
                All
              </button>
              <button
                onClick={() => filterItems('salad')}
                className={selectedCategory === 'salad' ? 'activeTab' : ''}
              >
                Salad
              </button>
              <button
                onClick={() => filterItems('pizza')}
                className={selectedCategory === 'pizza' ? 'activeTab' : ''}
              >
                Pizza
              </button>
              <button
                onClick={() => filterItems('soup')}
                className={selectedCategory === 'soup' ? 'activeTab' : ''}
              >
                Soup
              </button>
              <button
                onClick={() => filterItems('dessert')}
                className={selectedCategory === 'dessert' ? 'activeTab' : ''}
              >
                Desserts
              </button>
              <button
                onClick={() => filterItems('drinks')}
                className={selectedCategory === 'drinks' ? 'activeTab' : ''}
              >
                Drinks
              </button>
            </div>
            {/* sorting base filtering */}
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-black p-2">
                <FaFilter className="h-4 w-4 text-white"></FaFilter>
              </div>
              {/* sorting options */}
              <select
                name="sort"
                id="sort"
                onChange={e => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-black text-white px-2 py-1 rounded"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">low-to-high</option>
                <option value="high-to-low">high-to-low</option>
              </select>
            </div>
          </div>
          {/* product card */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <Cards key={index} item={item}></Cards>
            ))}
          </div>
        </div>
        {/* pagination section */}
        <div className="my-8">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? 'bg-green text-white'
                  : 'bg-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
