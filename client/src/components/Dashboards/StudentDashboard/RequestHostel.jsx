import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function RequestHostel() {
  const student = JSON.parse(localStorage.getItem("student"));
  const requestHostelChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let request = {
        hostel: hostel,
        reason: reason,
      };
      const res = await fetch(
        "http://localhost:3000/api/request/hostel-change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request, student: student._id }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Request Sent Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setReason("");
        setLoading(false);
      } else {
        // console.log(cms);
        data.errors.forEach((err) => {
          toast.error(err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  };

  //   const [name, setName] = useState();
  //   const [email, setEmail] = useState();
  //   const [contact, setContact] = useState();
  //   const [dob, setDob] = useState();
  //   const [password, setPassword] = useState();
  const [hostel, setHostel] = useState();
  const [hostels, setHostels] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };

  const getHostels = async () => {
    const res = await fetch("http://localhost:3000/api/student/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      setHostels(data.hostels);
    }
  };

  const [reason, setReason] = useState("");
  function handleReasonChange(e) {
    setReason(e.target.value);
  }

  useEffect(() => {
    getHostels();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center max-h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-5xl mt-5">Hostel Change</h1>
      <form
        method="POST"
        onSubmit={requestHostelChange}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <div className="w-full">
          <label
            htmlFor="hostel"
            className="block mb-2 text-sm font-medium text-white"
          >
            Shift to which Hostel?
          </label>
          <select
            required={true}
            value={hostel}
            onChange={handleHostelChange}
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="" disabled selected>
              Select Hostel
            </option>
            {hostels.map((hostel) => {
              return (
                <option key={hostel._id} value={hostel._id}>
                  {hostel.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="reason"
            className="block mb-2 text-sm font-medium text-white"
          >
            Hostel Change Reason
          </label>
          <textarea
            name="reason"
            placeholder="Reason..."
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={handleReasonChange}
            value={reason}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
          >
            Request Hostel Change
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default RequestHostel;
