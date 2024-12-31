import { useForm } from "react-hook-form"
import useAuth from "../../../hook/useAuth";
import {  useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // const from = location.state?.from?.pathname || '/';
  const {userUpdateProfile} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const onSubmit = (data) => {
    console.log(data.name, data.photoURL);
    userUpdateProfile(data.name, data.photoURL)
    .then(()=>{

    }).catch((error)=> {
      console.log(error);
    })
  }

  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <h3 className="font-bold">Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} placeholder="your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="text" {...register("photoURL", { required: true })} placeholder="photo" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white">Update</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateUserProfile;