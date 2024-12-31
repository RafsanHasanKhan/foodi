import { Link, Outlet } from 'react-router-dom';
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md';
import {
  FaEdit,
  FaLocationArrow,
  FaPlus,
  FaQuestionCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import logo from '/logo.png';
import useAdmin from '../hook/useAdmin';

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin);
  const sharedLinks = (
    <>
      <li>
        <Link to="/">
          <MdDashboard></MdDashboard> Home
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaShoppingCart></FaShoppingCart> Menu
        </Link>
      </li>
      <li>
        <Link to="/">
          <FaLocationArrow></FaLocationArrow> OrderTracking
        </Link>
      </li>
      <li>
        <Link to="/">
          <FaQuestionCircle></FaQuestionCircle> Customer Support
        </Link>
      </li>
    </>
  );

  // const isAdmin = true;

  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button sm:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn bg-green rounded-full text-white sm:hidden flex items-center gap-2">
              <FaUser></FaUser> Logout
            </button>
          </div>
          <div className="mt-5 mx-4 md:mt-2">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}

            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                {isAdmin ? (
                  <span className="badge badge-primary">Admin</span>
                ) : (
                  <span className="badge badge-primary">User</span>
                )}
              </Link>
            </li>
            {isAdmin ? (
              <>
                <hr />
                <li className="mt-3">
                  <Link to="/">
                    <MdDashboard></MdDashboard> Home
                  </Link>
                </li>
                <li >
                  <Link to="/dashboard">
                    <MdDashboard></MdDashboard> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag></FaShoppingBag> Manage Booking
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaPlus /> Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaEdit /> Manage Items
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users">
                    <FaUsers /> All Users
                  </Link>
                </li>
              </>
            ) : (
              <>
                <hr className="my-3" />
                {/* shared nav links */}
                {sharedLinks}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
