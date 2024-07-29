import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  let __URL__;
  if(document.domain === "localhost"){
    __URL__ = "http://localhost:1337"
  }else{
    __URL__ = ""
  }

  return (
    <div className={`w-full h-[50vh] lg:h-[80vh] bg-cover flex bg-[url('http://localhost:1337/blog_hero.png')] justify-start`}>
        <div className="lg:mt-40 lg:ml-20 lg:w-[30vw] mx-5 space-y-5 flex flex-col justify-center ">
          <h1 className="text-xl lg:text-4xl font-space ">
            Mastering the art of seamless development
          </h1>
          <h3 className=" lg:text-2xl">
            Stay Ahead of the Curve with the Latest Software Trends and Tools
          </h3>
          <p className="text-justify hidden lg:flex">
            By keeping up with the latest software trends and tools, you can
            ensure that your development process is optimized for efficiency,
            reliability, and scalability. Our tech blog is dedicated to bringing
            you in-depth reviews and tutorials on the most innovative and
            cutting-edge solutions.
          </p>
          <div className="space-x-1 lg:space-x-5">
            <Link to={"/blogs"} className="bg-[#ffd700] px-3 lg:px-5 py-1 rounded-xl shadow-lg text-[#7d0000]">
              Start reading
            </Link>
            <button className="bg-[#ffd700] px-3 lg:px-5 py-1 rounded-xl shadow-lg text-[#7d0000] ">
              Join the community
            </button>
          </div>
        </div>
      </div>
  )
}

export default Hero