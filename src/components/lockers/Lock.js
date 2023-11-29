import React from "react";

const Lock = ({ cabinet }) => {

  return (
    <div className="h-60  bg-yellow-700 m-2 rounded-2xl shadow-2xl p-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center py-2">{cabinet.number}</h1>
      <h1 className="text-3xl font-bold text-center uppercase">{cabinet.status}</h1>
    </div>
  );
};

export default Lock;
