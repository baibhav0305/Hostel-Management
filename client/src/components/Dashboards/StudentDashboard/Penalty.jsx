import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

function PenaltyStudent() {
  const student = JSON.parse(localStorage.getItem("student"));
  const getRequests = async () => {
    setProgress(30);
    // console.log(hostel);
    const res = await fetch("http://localhost:3000/api/penalty/getbystudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    setProgress(40);
    const data = await res.json();
    setProgress(60);
    // console.log(data);
    if (data.success) {
      setProgress(80);
      setPenalty(data.penalty);
    }
    setProgress(100);
  };

  const [progress, setProgress] = useState(0);
  const [penalty, setPenalty] = useState([]);

  const handleClick = () => {
    toast.info(`Send proof to Hostel Warden`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  useEffect(() => {
    getRequests();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <LoadingBar
        color="#0000FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="text-white font-bold text-5xl">Penalties</h1>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Penalties</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {penalty.length === 0 ? (
            <li className="mt-2">No due penalties</li>
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
                      Amount:{" "}
                      <span className="text-red-500">₹{req.amount}</span> |
                      Status:{" "}
                      <span className="text-yellow-500">{req.status}</span>
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      Reason: {req.reason}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClick}
                      className="w-full text-white hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
                    >
                      <a
                        href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Pay Now
                      </a>
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
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

export default PenaltyStudent;
