import React from "react";

const Lock = ({ cabinet }) => {
  return (
    <div className={`${cabinet.status === "occupied" ? " bg-slate-500 " : "bg-green-700"} h-60  m-2 rounded-2xl shadow-2xl p-2 flex flex-col justify-center items-center`}>
      <h1 className="text-3xl font-semibold text-center py-2">
        {cabinet.number}
      </h1>
      <h1 className="text-3xl font-bold text-center uppercase">
        {cabinet.status}
      </h1>
    </div>
  );
};

export default Lock;