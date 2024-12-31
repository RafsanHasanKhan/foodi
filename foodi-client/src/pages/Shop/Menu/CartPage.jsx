import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useCart from '../../../hook/useCart';
import useAuth from '../../../hook/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // calculate price
  const calculatePrice = item => {
    return item.price * item.quantity;
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  const handleIncrease = item => {
    // Make sure to send the updated quantity to the backend
    const newQuantity = item.quantity + 1;

    // Send the updated quantity using PATCH
    axiosSecure
      .patch(`/carts/${item._id}`, { quantity: newQuantity })
      .then(res => {
        // Update the cartItems state locally with the new quantity
        const updatedCart = cartItems.map(cartItem => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: newQuantity, // Update the quantity
            };
          }
          return cartItem;
        });

        // Refetch updated data from the backend and set the state
        refetch();
        setCartItems(updatedCart);
      })
      .catch(error => {
        console.error('Error updating quantity', error);
      });
  };

  // handleDecrease function
  const handleDecrease = item => {
    // Make sure to send the updated quantity to the backend
    const newQuantity = item.quantity - 1;

    if (item.quantity > 1) {
      // Send the updated quantity using PATCH
      axiosSecure
        .patch(`/carts/${item._id}`, { quantity: newQuantity })
        .then(res => {
          // Update the cartItems state locally with the new quantity
          const updatedCart = cartItems.map(cartItem => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: newQuantity, // Update the quantity
              };
            }
            return cartItem;
          });

          // Refetch updated data from the backend and set the state
          refetch();
          setCartItems(updatedCart);
        })
        .catch(error => {
          console.error('Error updating quantity', error);
        });
    } else {
      alert('zero');
    }
  };
  // delete item
  const handleDelete = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${item._id}`, item).then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
          console.log(res);
          refetch();
        });
      }
    });
  };
  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="pt-32 pb-20 flex flex-col justify-center items-center gap-8">
          {/* text content */}
          <div className=" space-y-7 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              Items Added To The <span className="text-green">Food</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        {cart.length ? (
          <>
            {/* table */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={() => console.log(item.quantity)}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>{calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button
                          onClick={() => handleDelete(item)}
                          className="btn btn-ghost btn-xs text-red"
                        >
                          X
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* customer details */}
            <div className="my-12 flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-1/2 space-y-3">
                <h3 className="font-medium">Customer Details</h3>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>User_id: {user.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <div className="md:w-1/2 space-y-3">
                  <h3 className="font-medium">Shopping Details</h3>
                  <p>Total Items: {cart.length}</p>
                  <p>Total Price: $ {orderTotal.toFixed(2)}</p>
                  <button className="btn bg-green uppercase text-white">
                    proceed checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="text-center ">
              <p className="my-8 text-xl">
                Cart Is empty. Please add products.
              </p>
              <Link className="" to="/menu">
                <button className="btn bg-green text-white text-center ">
                  Back To Menu
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
