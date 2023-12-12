import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from  "../../apiConfig";

const AllLockers = () => {
  const { city } = useParams();
  const [cabinets, setCabinets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lid, setLid] = useState("");
  const [transactions, setTransactions] = useState([]);

  const getLockersByCity = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/lockers/${city}`);
      if (response.ok) {
        const data = await response.json();
        const cab = data.lockers[0].cabinets;
        setLid(data.lockers[0]._id);
        setCabinets(cab);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get lockers");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const updateLockerStatus = async (cabinetNumber, status) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/lockers/${lid}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cabinetNumber: cabinetNumber,
            status: status,
          }),
        }
      );
      if (response.ok) {
        setCabinets((prevCabinets) =>
          prevCabinets.map((cabinet) =>
            cabinet.cabinetNumber === cabinetNumber
              ? { ...cabinet, status: status }
              : cabinet
          )
        );
      } else {
        console.error("Failed to update locker status");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions`);
      const data = await response.json();
      return data.transactions && Array.isArray(data.transactions)
        ? data.transactions
        : [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };

  const updateTransactionStatus = async (transactionId, newCabinetStatus) => {
    let transactionStatus;
    switch (newCabinetStatus) {
      case "occupied":
        transactionStatus = "delivered";
        break;
      case "available":
        transactionStatus = "in transit";
        break;
      default:
        console.error("Invalid cabinet status");
        return;
    }

    const updateData = { parcelStatus: transactionStatus };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/transactions/${transactionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update transaction status");
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleLockerStatusChange = async (cabinet, newStatus) => {
    await updateLockerStatus(cabinet.cabinetNumber, newStatus);

    // Find the transaction with the matching CabinetId
    // Note the capital 'C' and 'I' in CabinetId
    const matchingTransaction = transactions.find(
      (transaction) => transaction.CabinetId === cabinet._id
    );

    console.log("Cabinet ID:", cabinet._id);
    console.log("All Transactions:", transactions);

    // If a matching transaction is found, update its status
    if (matchingTransaction) {
      await updateTransactionStatus(matchingTransaction._id, newStatus);
    }
  };

  useEffect(() => {
    getLockersByCity();
    fetchTransactions().then(setTransactions);
  }, [city]);

  return (
    <div className=" min-h-screen w-full bg-blend-overlay bg-black/50 text-white">
      <h1 className="text-4xl font-bold text-center py-2">
        All Lockers of {city}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center text-2xl text-white">
          Loading
        </div>
      ) : (
        <div className="container p-2 flex flex-col sm:flex-row sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto items-center">
          {cabinets.map((cabinet, index) => (
            <div
              key={index}
              className={`${
                cabinet.status === "occupied" ? "bg-red-400" : "bg-green-400"
              } h-60 m-2 rounded-2xl shadow-2xl p-2 flex flex-col justify-center items-center`}
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
                  onClick={() => handleLockerStatusChange(cabinet, "occupied")}
                >
                  Set to Occupied
                </button>
              ) : (
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleLockerStatusChange(cabinet, "available")}
                >
                  Set to Available
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLockers;
