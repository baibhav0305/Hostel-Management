import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Hostel() {
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [allHostels, setallHostels] = useState([]);

  const getAllHostels = async () => {
    const result = await fetch(
      "http://localhost:3000/api/admin/get-all-hostels",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: admin._id, isSuper }),
      }
    );
    const data = await result.json();
    if (data.success) {
      setallHostels(data.hostels);
      console.log(data.hostels);
    }
  };

  const getAllStudents = async () => {
    const result = await fetch(
      "http://localhost:3000/api/admin/get-all-students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: admin._id, isSuper }),
      }
    );
    const data = await result.json();
    if (data.success) {
      setallStudents(data.students);
    }
  };

  useEffect(() => {
    getAllStudents();
    getAllHostels();
  }, [allHostels.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Hostels</h1>
      <div className="w-96 flex justify-center">
        <button
          target="_blank"
          className="px-20 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl"
        >
          <Link to="create-hostel">Create Hostel</Link>
        </button>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full max-h-96 mt-5 flex flex-wrap items-center justify-between overflow-auto">
        {allHostels.map((hostel) => {
          return (
            <div
              key={hostel._id}
              className="rounded-md flex flex-col items-center justify-center p-4 m-4 border-blue-600 border-2 hover:bg-blue-600 transition-all w-1/4  divide-y divide-gray-600"
            >
              <p className="text-white text-xl font-bold pb-1">{hostel.name}</p>
              <div className="pt-2">
                <p className="text-gray-400 font-light text-sm">
                  Rooms: {hostel.rooms}
                </p>
                <p className="text-gray-400 font-light">
                  Capacity: {hostel.capacity}
                </p>
                <p className="text-gray-400 font-light">
                  Vacant: {hostel.vacant}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hostel;
