import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import Modal from './Modal';
import SocialLogin from './SocialLogin';
import useAuth from '../hook/useAuth';
// import useAxiosSecure from './../hook/useAxiosSecure';
import useAxiosPublic from '../hook/useAxiosPublic';
import Swal from 'sweetalert2';
// import axios from 'axios';

const Signup = () => {
  const { createUser, userUpdateProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    createUser(data.email, data.password).then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);

      userUpdateProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post('/users', userInfo).then(res => {
            res => {
              if (res.data.insertedId) {
                console.log('user added to the database');
                Swal.fire({
                  title: 'Custom animation with Animate.css',
                  showClass: {
                    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
                  },
                  hideClass: {
                    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
                  },
                });
              }
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  return (
    <div>
      <div className="m-4 p-0 flex justify-end ">
        <Link
          to="/"
          className="text-2xl btn btn-circle hover:bg-green hover:text-white"
        >
          <IoMdClose />
        </Link>
      </div>
      <div className="max-w-md bg-white shadow-md w-full mx-auto flex items-end justify-center p-4 my-20 border-2 rounded-xl ">
        <div className="modal-action xl:w-96 flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Create A Account!</h3>
            {/* name */}
            <div className="form-control">
              
              {/* email */}
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                {...register('name')}
              />
            </div>
            <div className="form-control">
              
              {/* email */}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register('email')}
              />
            </div>
            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register('password')}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Signup"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-2">
              Have an account?{' '}
              <Link to="/login" className="text-red underline ml-1">
                Login Now
              </Link>
            </p>
          </form>
          {/* social signin */}
          <SocialLogin></SocialLogin>
        </div>
        <Modal></Modal>
      </div>
    </div>
  );
};

export default Signup;
