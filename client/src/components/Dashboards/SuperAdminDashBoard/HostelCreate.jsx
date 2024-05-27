import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HostelCreate() {
  const navigate = useNavigate();
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));
  const registerAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let hostelDetails = {
        name: name,
        location: location,
        rooms: rooms,
        capacity: capacity,
        vacant: vacant,
      };
      const res = await fetch(
        "http://localhost:3000/api/admin/create-hostel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostelDetails, isSuper }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Hostel Created Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setName("");
        setLocation("");
        setCapacity(0);
        setRooms(0);
        setVacant(0);

        setLoading(false);
        navigate(-1);
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

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [rooms, setRooms] = useState();
  const [capacity, setCapacity] = useState();
  const [vacant, setVacant] = useState();

  const [loading, setLoading] = useState(false);

  // const handleHostelChange = (event) => {
  //   setHostel(event.target.value);
  // };

  // const admin = JSON.parse(localStorage.getItem("admin"));

  // const getHostels = async () => {
  //   const res = await fetch("http://localhost:3000/api/admin/get-all-hostels", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: admin._id, isSuper }),
  //   });
  //   const data = await res.json();

  //   if (data.success) {
  //     setHostels(data.hostels);
  //   }
  // };

  // useEffect(() => {
  //   getHostels();
  // }, []);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Create Hostel
      </h1>
      <div className="md:w-[60vw] p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form
          method="post"
          onSubmit={registerAdmin}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "Hostel Name",
                placeholder: "Hostel Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Location",
                placeholder: "Hostel Location",
                type: "text",
                req: true,
                value: location,
                onChange: (e) => setLocation(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "Number of Rooms",
                placeholder: "Number of rooms",
                type: "number",
                req: true,
                value: rooms,
                onChange: (e) => setRooms(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Number of Beds",
                placeholder: "Capacity",
                type: "number",
                req: true,
                value: capacity,
                onChange: (e) => setCapacity(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Vacant Rooms",
                placeholder: "Vacant rooms",
                type: "number",
                req: true,
                value: vacant,
                onChange: (e) => setVacant(e.target.value),
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Creating...
                </>
              ) : (
                <span>Create Hostel</span>
              )}
            </Button>
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
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HostelCreate;
