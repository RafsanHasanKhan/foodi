import { useEffect, useState } from 'react';
import logo from '/logo.png';
import { FaRegUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Modal from './Modal';
import Profile from './Profile';
import useAuth from '../hook/useAuth';
import useCart from '../hook/useCart';
const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const {user} = useAuth();
  const [cart] = useCart();
  // handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <details>
          <summary>
            <NavLink to="/menu">Menu</NavLink>
          </summary>
          <ul className="p-2">
            <li>
              <NavLink to="/menu">All</NavLink>
            </li>
            <li>
              <NavLink to="/salad">Salad</NavLink>
            </li>
            <li>
              <NavLink to="/pizza">Pizza</NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>
            <NavLink to="/services">Services</NavLink>
          </summary>
          <ul className="p-2">
            <li>
              <NavLink>Online Order</NavLink>
            </li>
            <li>
              <NavLink>Table Booking</NavLink>
            </li>
            <li>
              <NavLink>Order Tracking</NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <NavLink to="/offers">Offers</NavLink>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? 'shadow-sm bg-base-100 transition-all ease-in-out duration-300'
            : ''
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a>
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* navItems */}
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/* search */}
          <div className="mr-1">
            <button className="btn btn-ghost btn-circle hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          {/* cart Items */}
          <Link to='/cartPage'>
          <div className="mr-3 flex items-center justify-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hidden lg:flex"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </div>
          </div>
          </Link>
          {/* btn */}
          
          {/* User Profile or Login */}
          <div>
            {user ? (
              <Profile />
            ) : (
              <button
                onClick={() => document.getElementById('my_modal_5').showModal()}
                className="btn bg-green rounded-full text-white hover:text-red px-6 flex items-center gap-2"
              >
                <FaRegUser className="text-xl" /> Login
              </button>
            )}
          </div>
          <Modal></Modal>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
