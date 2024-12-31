import useAuth from "../hook/useAuth";
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
// import useAxiosSecure from "../hook/useAxiosSecure";
import useAxiosPublic from "../hook/useAxiosPublic";
const SocialLogin = () => {
  const {googleLogin} = useAuth();

  const handleGoogleSignInT = () => {
    const axiosPublic = useAxiosPublic();
    googleLogin()
    .then(res => {
      console.log(res);
      const userInfo ={
        name: res?.user?.displayName,
        email: res?.user?.email,
      }
      console.log(userInfo);
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <div className="text-center space-x-3 mb-5">
            <button onClick={handleGoogleSignInT} className="btn btn-circle hover:bg-green hover:text-white">
              <FaGoogle></FaGoogle>
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF></FaFacebookF>
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub></FaGithub>
            </button>
          </div>
    </div>
  );
};

export default SocialLogin;