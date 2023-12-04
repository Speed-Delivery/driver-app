import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AllLockers = () => {
  const { city } = useParams();
  const [cabinets, setCabinets] = useState([]); // State to hold error information
  const [loading, setLoading] = useState(false); // State to hold error information
  const [lid, setLid] = useState(""); // State to hold error information

  const getLockersByCity = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5005/api/lockers/${city}/`
      );
      if (response.ok) {
        const data = await response.json();
        const cab = data.lockers[0].cabinets;
        setLid(data.lockers[0]._id);
        setCabinets(cab);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        throw new Error(errorData.message || "Failed to get lockers");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const updateLockerStatus = async (cabinetNumber, status, currentParcel) => {
    setLoading(true);
    console.log(lid);
    try {
      const response = await fetch(
        `http://localhost:5005/api/lockers/${lid}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cabinetNumber: cabinetNumber,
            status: status,
            currentParcel: currentParcel,
          }),
        }
      );

      if (response.ok) {
        // If the response was successful, update the status in the UI
        setCabinets((prevCabinets) => {
          return prevCabinets.map((cabinet) => {
            if (cabinet.cabinetNumber === cabinetNumber) {
              return { ...cabinet, status: status };
            } else {
              return cabinet;
            }
          });
        });
        setLoading(false);
      } else {
        // If the response was not successful, handle the error
        console.error("Failed to update locker status");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLockersByCity();
  }, []);

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
        All Lockers of {city}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center text-2xl text-white">
          {" "}
          Loading
        </div>
      ) : (
        <div className="container p-2 flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center">
          {cabinets.map((cabinet, index) => {
            return (
              <div
                key={index}
                className={`${
                  cabinet.status === "occupied"
                    ? " bg-slate-500 "
                    : "bg-green-700"
                } h-60  m-2 rounded-2xl shadow-2xl p-2 flex flex-col justify-center items-center`}
              >
                <h1 className="text-3xl font-semibold text-center py-2">
                  {cabinet.cabinetNumber}
                </h1>
                <h1 className="text-3xl font-bold text-center uppercase">
                  {cabinet.status}
                </h1>
                {cabinet.status === "available" ? (
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      updateLockerStatus(
                        cabinet.cabinetNumber,
                        "occupied",
                        cabinet.currentParcel
                      );
                    }}
                  >
                    Set to Occupied
                  </button>
                ) : (
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      updateLockerStatus(
                        cabinet.cabinetNumber,
                        "available",
                        cabinet.currentParcel
                      );
                    }}
                  >
                    Set to Available
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllLockers;
