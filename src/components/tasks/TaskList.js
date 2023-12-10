import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [lockers, setLockers] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchLockers();
    fetchParcels();
    fetchTransactions();
  }, []);

  const fetchLockers = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/lockers");
      if (response.ok) {
        const data = await response.json();
        setLockers(data.lockers);
      } else {
        console.error("Error fetching lockers:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchParcels = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/parcels");
      if (response.ok) {
        const data = await response.json();
        setParcels(data.parcels);
      } else {
        console.error("Error fetching parcels:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/transactions");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      } else {
        console.error("Error fetching transactions:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLockerSelection = (city) => {
    console.log("Selected city:", city); // Debugging line
    setSelectedCity(city);
  };

  const getParcelsForCity = () => {
    if (!Array.isArray(lockers) || !Array.isArray(parcels) || !Array.isArray(transactions)) {
      return [];
    }
  
    // Create a mapping of Cabinet IDs to Locker locations
    const lockerCabinetMapping = lockers.reduce((acc, locker) => {
      locker.cabinets.forEach(cabinet => {
        acc[cabinet._id] = locker.location; // Use the correct property for cabinet ID
      });
      return acc;
    }, {});
  
    // Create a mapping of Parcel IDs to their corresponding Locker location based on Transaction Cabinet ID
    const transactionCabinetMapping = transactions.reduce((acc, transaction) => {
      const lockerLocation = lockerCabinetMapping[transaction.CabinetId]; // Use the correct property for Cabinet ID
      if (lockerLocation) {
        acc[transaction.parcelId] = lockerLocation; // Use the correct property for parcel ID
      }
      return acc;
    }, {});
  
    // Filter parcels based on the selected city
    const filteredParcels = parcels.filter(parcel => 
      transactionCabinetMapping[parcel._id] === selectedCity // Use the correct property for parcel ID
    );
  
    return filteredParcels;
  };
  

  const filteredParcels = getParcelsForCity();

  const updateTransactionStatus = async (parcelId, newStatus) => {
    const transaction = transactions.find(t => t.parcelId === parcelId);
    if (transaction) {
      const response = await fetch(`http://localhost:5005/api/transactions/${transaction._id}/${newStatus}`, { method: 'POST' });
      if (response.ok) {
        fetchTransactions(); // Refresh the transactions list
      } else {
        // Handle errors, e.g., display a message
      }
    }
  };

  const markParcelAsPickedUp = async (parcelId) => {
    await updateTransactionStatus(parcelId, 'pick-up');
  };

  const markParcelAsDelivered = async (parcelId) => {
    await updateTransactionStatus(parcelId, 'deliver');
  };
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Parcel Locker Management</h1>
      </header>
  
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Select a Locker</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {lockers.map((locker) => (
            <button
              key={locker._id.$oid}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleLockerSelection(locker.location)}
            >
              {locker.location}
            </button>
          ))}
        </div>
      </section>
  
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Parcels in {selectedCity}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParcels.map((parcel) => {
              // Find the corresponding transaction for this parcel
              const transaction = transactions.find((t) => t.parcelId === parcel._id);
  
              // Determine whether to render the "Mark as Delivered" or "Mark as Picked Up" button
              const isTransit = transaction && transaction.parcelStatus === 'in transit';
              const isAwaitingPickup = transaction && transaction.parcelStatus === 'awaiting pickup';
  
              // Hide the buttons if parcelStatus is neither "in transit" nor "awaiting pickup"
              if (!isTransit && !isAwaitingPickup) {
                return null; // Return null to skip rendering
              }
  
              return (
                <div key={parcel._id} className="p-4 border border-gray-200 rounded shadow">
                  <p className="font-bold">Parcel ID: {parcel._id.$oid}</p>
                  <p>Parcel Description: {parcel.parcelDescription}</p>
                  <p>Weight: {parcel.parcelWeight && parcel.parcelWeight.$numberInt} kg</p>
                  <p>
                    Dimensions (LxWxH):{' '}
                    {parcel.parcelDimension &&
                      `${parcel.parcelDimension.length.$numberInt}x${parcel.parcelDimension.width.$numberInt}x${parcel.parcelDimension.height.$numberInt}`}{' '}
                    cm
                  </p>
                  <p>Sender: {parcel.sender && parcel.sender.name}</p>
                  <p>Recipient: {parcel.recipient && parcel.recipient.name}</p>
                  <p>Status: {transaction ? transaction.parcelStatus : 'Unknown'}</p>
                  {isTransit && (
                    <button
                      className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                      onClick={() => markParcelAsDelivered(parcel._id)}
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {isAwaitingPickup && (
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      onClick={() => markParcelAsPickedUp(parcel._id)}
                    >
                      Mark as Picked Up
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );  
};  

export default TaskList;
