import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Slice/authSlice";
import { toast } from "react-hot-toast";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tabs = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/profile" },
  ];

  const handleBackClick = () => {
    // If already on home page, either do nothing or go to home again
    if (location.pathname != '/') {
      navigate(-1); // Normal back behavior
    }
  };

  const handleLogout = ()=>{
    dispatch(logout());
    toast.success("You have been Succesfully Logged out");
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <button
          onClick={handleBackClick}
          className="btn btn-ghost btn-circle mr-2"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <a href='./' className="font-semibold text-3xl">TaskFlow</a>
      </div>
      <div className="navbar-center">
        <div role="tablist" className="tabs tabs-lift">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              role="tab"
              className={({ isActive }) =>
                `transition-all duration-200 ease-in tab ${isActive ? "tab-active" : ""}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
}

