import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { IoMdClose } from 'react-icons/io';
import useAuth from '../hook/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hook/useAxiosPublic';

const Login = () => {
  const { loginUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    loginUser(data.email, data.password)
      .then(res => {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
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
        navigate(from, { replace: true });
        
      })
      .catch(error => {
        const errorMessage = error.message;
        setErrorMessage('Please provide a correct email and password');
      });
  };
  return (
    <div>
      <div className="m-4 p-0 flex justify-end ">
        {/* if there is a button in form, it will close the modal */}
        <Link
          to="/"
          className="text-2xl btn btn-circle hover:bg-green hover:text-white"
        >
          <IoMdClose />
        </Link>
      </div>
      <div className='max-w-md bg-white shadow-md w-full mx-auto flex items-end justify-center p-4 my-20 border-2 rounded-xl '>
      <div className='xl:w-96 flex flex-col justify-center mt-0'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Please Login!</h3>
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
          {/* error message */}
          {errorMessage ? (
            <p className="text-sm text-red ml-1">{errorMessage}</p>
          ) : (
            ''
          )}
          {/* login btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2">
            Do not have an account?{' '}
            <Link to="/signup" className="text-red underline ml-1">
              Signup Now
            </Link>
          </p>
        </form>
        {/* social signin */}
        <SocialLogin></SocialLogin>
      </div>
      </div>
    </div>
  );
};

export default Login;
