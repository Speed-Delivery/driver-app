import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <Link
            to="/tasklist"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            Task List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
