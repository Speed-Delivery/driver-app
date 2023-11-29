import React from "react";
import parcelData from "../../dummy_data/parcelData.json";

const AvailableParcels = () => {
  const { parcels } = parcelData;

  const availableParcels = parcels;

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
        Pending parcels ready to deliver
      </h1>
      <div className="container p-2 flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center">
        {availableParcels.map((parcel, index) => {
          return (
            <div className="">
              <div className="h-60  bg-gray-600  m-2 rounded-2xl shadow-2xl p-2 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold text-center">
                  ID : {parcel.id}
                </h1>
                <h1 className="text-xl  text-center">
                  Locker ID : {parcel.lockerId}
                </h1>
                <h1 className="text-xl  text-center">
                  Cabinet No : {parcel.cabinetNumber}
                </h1>
                <h1 className="text-xl  text-center">
                  Sender : {parcel.sender}
                </h1>
                <h1 className="text-xl  text-center">City : {parcel.city}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableParcels;
