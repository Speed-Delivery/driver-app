import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const cities = ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"];

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1630710577149-9220addf1fd3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" min-h-screen w-full bg-blend-overlay bg-black/50"
    >
      <div className="text-center py-3">
        <span className="text-3xl text-white font-semibold">
          Pick a any locker location from below
        </span>
      </div>
      <div className="container p-2 sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-auto items-center">
        {cities.map((city, index) => (
          <Link to={`/all-lockers/${city}`} key={index}>
            <div className="p-4 sm:p-6 md:max-w-sm m-5 rounded-lg text-center shadow-lg bg-slate-300 transition-all duration-300 ease-in-out hover:shadow-2xl ">
              <span className="text-4xl font-bold "> {city} </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
