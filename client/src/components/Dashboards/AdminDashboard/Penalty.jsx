import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Penalty() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));

  const [penalty, setPenalty] = useState([]);

  const getAllPenalty = async () => {
    const result = await fetch("http://localhost:3000/api/penalty/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin, hostel: hostel._id }),
    });
    const data = await result.json();
    if (data.success) {
      setPenalty(data.penalty);
      //   console.log(data.penalty);
    }
  };

  const updatePenalty = async (id, status) => {
    const res = await fetch("http://localhost:3000/api/penalty/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status, isAdmin }),
    });
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      //   let student = newReqs.find((req) => req.id === id).student;
      toast.success(`Penalty has been ${status}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const approve = (id) => {
    setPenalty((newReqs) => newReqs.filter((req) => req._id !== id));
    updatePenalty(id, "approved");
  };

  useEffect(() => {
    getAllPenalty();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Penalty</h1>
      <div className="w-96 flex justify-center">
        <button
          target="_blank"
          className="px-20 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl"
        >
          <Link to="create-penalty">New Penalty</Link>
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
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full max-h-96 mt-5 items-center justify-between overflow-auto">
        <span className="text-white font-bold text-xl">All Penalties</span>
        <div className="">
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {penalty.length === 0 ? (
              <li className="mt-2">No new penalties</li>
            ) : (
              penalty.map((req) => (
                <li
                  className="group py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                  key={req._id}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:scale-105 group-hover:text-yellow-500 transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {req.student.name} [{req.student.student_id}]
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        Amount: ₹{req.amount} | Status:{" "}
                        <span className="text-yellow-500">{req.status}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        reason: {req.reason}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="group/show relative z-0"
                        onClick={() => approve(req._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-green-600 hover:scale-125
                      transition-all"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                          Approve.
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </div>
  );
}

export default Penalty;
