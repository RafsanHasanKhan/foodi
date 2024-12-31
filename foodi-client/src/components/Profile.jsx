import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Profile = () => {
  const { user, logOut } = useAuth();
  console.log(user.photoURL);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then((res) => {
        alert("User logged out successfully");
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    // If the user is not authenticated, you can either show a loading spinner or just return null
    return <div>Loading...</div>;
  }

  return (
    <div className="drawer drawer-end z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="cursor-pointer drawer-button btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {/* Ensure user and photoURL are available */}
            {user && user.photoURL ? (
              <img alt="profile image" src={user.photoURL} />
            ) : (
              <img
                alt="Default Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            )}
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/updateProfile">Profile</Link>
          </li>
          <li>
            <a>Order</a>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a>Setting</a>
          </li>
          <li>
            <button onClick={handleLogout} className="text-red">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
