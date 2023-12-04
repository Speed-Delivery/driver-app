import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const DriverProfile = () => {
  const { user, isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <div>You need to login to view this page.</div>;
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
        <h1 className="text-center font-semibold text-2xl py-2">
          User Profile
        </h1>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Username</td>
              <td className="border px-4 py-2">{user.username}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Email</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/">
          <button className="btn py-2 my-2 bg-black text-white w-full">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DriverProfile;
