import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Mess() {
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));
  const registerAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let admin = {
        name: name,
        email: email,
        contact: contact,
        dob: dob,
        hostel: hostel,
        password: password,
      };
      const res = await fetch(
        "http://localhost:3000/api/admin/register-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ admin, isSuper }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Admin Registered Successfully!", {
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
        setEmail("");
        setContact("");
        setDob("");
        setPassword("");
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

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [dob, setDob] = useState();
  const [password, setPassword] = useState();
  const [hostel, setHostel] = useState();
  const [hostels, setHostels] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };

  const admin = JSON.parse(localStorage.getItem("admin"));

  const getHostels = async () => {
    const res = await fetch("http://localhost:3000/api/admin/get-all-hostels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: admin._id, isSuper }),
    });
    const data = await res.json();

    if (data.success) {
      setHostels(data.hostels);
    }
  };

  useEffect(() => {
    getHostels();
  }, []);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">Mess Menu </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <table className="text-white">
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
          <tr>
            <td>Monday</td>
            <td>Poha</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>Idli Sambhar</td>
            <td>Female</td>
            <td>Female</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>Vada</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>Puri Chole</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>Upma</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>Dosa</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Sunday</td>
            <td>Noodles</td>
            <td>Male</td>
            <td>Male</td>
          </tr>
        </table>
        {/* {hostels.length && (
          <form
            method="post"
            onSubmit={registerAdmin}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-5 justify-center md:w-full sw-[100vw]">
              <Input
                field={{
                  name: "name",
                  placeholder: "Admin Name",
                  type: "text",
                  req: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                }}
              />
              <Input
                field={{
                  name: "email",
                  placeholder: "Admin Email",
                  type: "email",
                  req: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                }}
              />
            </div>
            <div className="flex gap-5 w-full justify-center">
              <Input
                field={{
                  name: "contact",
                  placeholder: "Admin Contact",
                  type: "text",
                  req: true,
                  value: contact,
                  onChange: (e) => setContact(e.target.value),
                }}
              />
              <Input
                field={{
                  name: "dob",
                  placeholder: "Admin dob",
                  type: "date",
                  req: true,
                  value: dob,
                  onChange: (e) => setDob(e.target.value),
                }}
              />
              <div className="w-full">
                <label
                  htmlFor="hostel"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Hostel
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
            </div>
            <div className="w-full">
              <Input
                field={{
                  name: "password",
                  placeholder: "Admin Password",
                  type: "password",
                  req: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                }}
              />
            </div>
            <div className="mt-5">
              <Button>
                {loading ? (
                  <>
                    <Loader /> Registering...
                  </>
                ) : (
                  <span>Register Admin</span>
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
        )} */}
      </div>
    </div>
  );
}

export default Mess;
