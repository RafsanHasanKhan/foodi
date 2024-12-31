import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import useAuth from '../hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hook/useAxiosSecure';
import useCart from '../hook/useCart';

const Cards = ({ item }) => {
  const { _id, name, recipe, image, category, price } = item;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart(); // Ensure this is correctly fetching the refetch function
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Heart button state
  const [isHeartFilleted, setHeartFilleted] = useState(false);
  const handleHeartClick = () => {
    setHeartFilleted(!isHeartFilleted);
  };

  const handleAddToCart = () => {
    // Check if the user is logged in (user exists and has email)
    if (user && user?.email) {
      // If the user is logged in, proceed to add item to the cart
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      // Make the POST request to add the item to the cart
      axiosSecure.post('/carts', cartItem)
        .then(res => { 
          refetch(); // Refresh the cart after item is added
          // Check if the item was successfully added and show the success alert
          if (res.data.menuItemId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item successfully added to cart!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            // Failure alert (optional)
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to add item to cart!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.error("Error adding to cart:", error.response?.data || error.message);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error adding item to cart",
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      // If the user is not logged in, show the login prompt
      Swal.fire({
        title: 'You are not logged in',
        text: 'Please login to add to the cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login!',
      }).then(result => {
        if (result.isConfirmed) {
          // Redirect to the login page and pass the current location to redirect after login
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="card flex justify-between bg-base-100 shadow-xl relative">
        <div
          onClick={handleHeartClick}
          className={`absolute right-2 top-2 p-4 bg-green heartStar rating gap-1 ${
            isHeartFilleted ? 'text-rose-500' : 'text-white'
          }`}
        >
          <FaHeart className="h-5 w-5 cursor-pointer" />
        </div>
        <Link to={`/menu/${_id}`}>
          <figure>
            <img
              src={image}
              alt={name}
              className="hover:scale-105 transition-all duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="truncate">{recipe}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-sm text-red">$</span> {price}
            </h5>
            <button
              onClick={handleAddToCart}
              className="btn bg-green text-white"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
