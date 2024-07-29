import React, { useContext } from "react";
import { SidbarContext } from "../context/SidbarContext";

import Hero from "../component/Home/Hero";
import RecentPosts from "../component/Home/RecentPosts";

const Home = () => {
  const { showMenu, setShowMenu } = useContext(SidbarContext);
  const handleMenu = () => {
    if (showMenu) setShowMenu(false);
  };
  return (
    <main
      onClick={handleMenu}
      className="mt-2 w-full flex flex-wrap justify-center items-center text-white"
    >
      <Hero/>
      <RecentPosts/>
    </main>
  );
};

export default Home;
