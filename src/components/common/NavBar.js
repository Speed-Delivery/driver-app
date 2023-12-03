import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if the user is an admin
  const isAdmin = user && user.role === "admin";
  console.log("The user value is: ", user);
  console.log("isAdmin is: ", isAdmin);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };

  return (
    <nav className="flex items-center bg-gray-900 p-3 flex-wrap">
      <Link to="/" className="p-2 mr-4 inline-flex items-center">
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Speed-Delivery (Driver)
        </span>
      </Link>

      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IoMenu className="h-5 w-5" />
      </button>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          {/* Static links */}
          <Link
            to="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {/* Authenticated user links */}

              <Link
                to="/available-parcels"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Parcels
              </Link>
              {/* <Link
                to="/free-parcel"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Free Lockers
              </Link>
              <Link
                to="/booked-parcel"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Booked Lockers
              </Link> */}
              <Link
                to="/profile"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Profile
              </Link>
              {/* <Link
                to="/account-deletion"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Account Deletion
              </Link> */}
              {/* Admin links only admins*/}
              {isAdmin && (
                <Link
                  to="/admin-panel"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Non-authenticated user links */}
              <Link
                to="/signin"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
