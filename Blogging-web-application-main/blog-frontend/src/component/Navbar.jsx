import React, { useContext } from "react";
import { SidbarContext } from "../context/SidbarContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { MdContactPage } from "react-icons/md";
import { BiWindowClose } from "react-icons/bi";
import {BsFillMenuAppFill} from "react-icons/bs"
const Navbar = () => {
  const sideBar = useContext(SidbarContext);
  const toggleMenu = () => {
    sideBar.setShowMenu(!sideBar.showMenu);
    
  };
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <header className="z-50 sticky top-0 flex flex-col w-screen justify-start py-5 px-10 bg-gray-900 text-white font-space">
      <nav className=" w-full mx-auto flex justify-between items-start  sticky top-5">
        <div>Logo</div>
        <button onClick={toggleMenu} className="lg:hidden">
          <BsFillMenuAppFill size={25}/>
        </button>
        {/* ------------Mobile Nav------------ */}
        <div
          className={`lg:hidden text-white text-2xl flex flex-col bg-gray-900 w-64 fixed ${
            sideBar.showMenu ? "right-0" : "-right-64"
          } z-50 top-0 p-5 h-screen items-start justify-start space-y-10 pt-16`}
        >
          <Link to="/" className="flex justify-center items-center space-x-2">
            <GoHome />
            <span>Home</span>
          </Link>
          <Link
            to="/blogs"
            className="flex justify-center items-center space-x-2"
          >
            <ImBlog />
            <span>Blog</span>
          </Link>
          <Link
            to="/write"
            className="flex justify-center items-center space-x-2"
          >
            <TfiWrite />
            <span>Write</span>
          </Link>
          <Link
            to="/about"
            className="flex justify-center items-center space-x-2"
          >
            <FcAbout />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            className="flex justify-center items-center space-x-2"
          >
            <MdContactPage />
            <span>Contact</span>
          </Link>
          {token ? (
            <button
              onClick={logOut}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-md"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-md"
              >
                Log In
              </Link>
              <Link
                to={"/register"}
                className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-md"
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleMenu}
            className="flex justify-center items-center space-x-2"
          >
            <BiWindowClose />
            <span>Close</span>
          </button>
        </div>
        {/* -------Desk Nav---------- */}
        <div
          className={
            "hidden lg:flex justify-center items-center space-x-10 text-xl"
          }
        >
          <Link to="/" className="flex justify-center items-center space-x-2">
            <GoHome />
            <span>Home</span>
          </Link>
          <Link
            to="/blogs"
            className="flex justify-center items-center space-x-2"
          >
            <ImBlog />
            <span>Blog</span>
          </Link>
          <Link
            to="/write"
            className="flex justify-center items-center space-x-2"
          >
            <TfiWrite />
            <span>Write</span>
          </Link>
          <Link
            to="/about"
            className="flex justify-center items-center space-x-2"
          >
            <FcAbout />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            className="flex justify-center items-center space-x-2"
          >
            <MdContactPage />
            <span>Contact</span>
          </Link>
          {token ? (
            <button
              onClick={logOut}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-pulse"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-bounce"
              >
                Log In
              </Link>
              <Link
                to={"/register"}
                className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-bounce"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
