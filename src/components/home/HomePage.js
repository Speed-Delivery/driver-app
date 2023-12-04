import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const cities = ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"];
  

  //if the user is not authenticated, redirect to the login page
  //if the user is not authenticated, redirect to the login page


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
      <div className="container p-2 flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center">
        {cities.map((city, index) => (
          <Link to={`/all-lockers/${city}`} key={index}>
            <div
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1607950410318-7dd27e3361dd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              }}
              className="bg-cover bg-center bg-slate-100/80 bg-blend-overlay h-60 m-2 rounded-lg p-2 shadow-2xl flex flex-col items-center justify-center hover:bg-slate-100/50  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
            >
              <span className="text-4xl font-bold "> {city} </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
