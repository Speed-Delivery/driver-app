import React, { useState } from "react";
import parcelData from "../../dummy_data/parcelData.json";

const AvailableParcels = () => {
  const [deliveryStatus, setDeliveryStatus] = useState(""); 
  const { parcels } = parcelData;
  const [availableParcels, setAvailableParcels] = useState(parcels);

  const handleDeliveryButton = (id) => {
    //console.log("Delivery button clicked for parcel id: ", id);
    const updatedParcels = availableParcels.map((parcel) =>
      parcel.id === id ? { ...parcel, status: "delivered" } : parcel
    );
    setAvailableParcels(updatedParcels);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1630710577149-9220addf1fd3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" min-h-screen w-full bg-blend-overlay bg-black/50 "
    >
      <h1 className="text-4xl font-bold text-center py-2 text-white">
        Parcel Information
      </h1>
      <div className="container p-4 grid md:grid-cols-2 gap-4 mx-auto items-center">
        {availableParcels.map((parcel, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-200 p-4 grid grid-cols-2 gap-2">
              <div>
                <h1 className="text-lg font-semibold">Parcel ID</h1>
                <p className="text-xl">{parcel.id}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Locker ID</h1>
                <p className="text-xl">{parcel.lockerId}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Cabinet No</h1>
                <p className="text-xl">{parcel.cabinetNumber}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Sender</h1>
                <p className="text-xl">{parcel.sender}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Receiver</h1>
                <p className="text-xl">{parcel.recipient}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">City</h1>
                <p className="text-xl">{parcel.city}</p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Status</h1>
                <p className="text-xl uppercase">{parcel.status}</p>
              </div>
              {parcel.status === "pending" ? (
                <button
                  onClick={() => handleDeliveryButton(parcel.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-300"
                >
                  Deliver
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded duration-300"
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableParcels;