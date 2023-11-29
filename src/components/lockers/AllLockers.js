import React from "react";
import parcelData from "../../dummy_data/parcelData.json";
import Lock from "./Lock";
import { useParams } from "react-router-dom";

const AllLockers = () => {
  const { cities } = parcelData;
  const { id } = useParams();
  const pickedCity = cities[id -1];
  console.log(pickedCity);
  const cabinets = pickedCity.cabinets;

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1630710577149-9220addf1fd3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" min-h-screen w-full bg-blend-overlay bg-black/50 text-white"
    >
      <h1 className="text-4xl font-bold text-center py-2">
        All Lockers of Oulu
      </h1>
      <div className="container p-2 flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center">
        {cabinets.map((locker, index) => {
          return <Lock key={index} cabinet={locker} />;
        })}
      </div>
    </div>
  );
};

export default AllLockers;
