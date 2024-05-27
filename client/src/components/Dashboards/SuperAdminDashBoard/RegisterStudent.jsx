import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterStudent() {
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));

  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let student = {
        name: name,
        dob: dob,
        email: email,
        student_id: studentid,
        parent_email: parent_email,
        contact: contact,
        parent_contact: parentContact,
        father_name: fatherName,
        address: address,
        room_no: room_no,
        hostel: hostel,
        batch: batch,
        branch: branch,
        password: password,
      };
      const res = await fetch(
        "http://localhost:3000/api/student/register-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ student, isSuper }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(
          "Student " + data.student.name + " Registered Successfully!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setName("");
        setDob("");
        setEmail("");
        setStudentId("");
        setParentEmail("");
        setContact("");
        setParentContact("");
        setFatherName("");
        setAddress("");
        setRoomNo("");
        setHostel("");
        setBatch("");
        setBranch("");
        // setCourse("");
        // setCnic("");
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
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [studentid, setStudentId] = useState();
  const [parent_email, setParentEmail] = useState();
  const [contact, setContact] = useState();
  const [parentContact, setParentContact] = useState();
  const [fatherName, setFatherName] = useState();
  const [address, setAddress] = useState();
  const [room_no, setRoomNo] = useState();
  const [hostel, setHostel] = useState();
  const [branch, setBranch] = useState();
  const [batch, setBatch] = useState();
  const [password, setPassword] = useState();

  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
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
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Register Student
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form
          method="post"
          onSubmit={registerStudent}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5 justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Date of Birth",
                placeholder: "Student dob",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Student Id",
                placeholder: "Student Id",
                type: "text",
                req: true,
                value: studentid,
                onChange: (e) => setStudentId(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Parent's Email",
                placeholder: "Parent's Email",
                type: "email",
                req: true,
                value: parent_email,
                onChange: (e) => setParentEmail(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Parent's Contact",
                placeholder: "Parent's Contact",
                type: "text",
                req: true,
                value: parentContact,
                onChange: (e) => setParentContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "father's Name",
                placeholder: "Father's Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>
          <div className="">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "room",
                placeholder: "Student Room",
                type: "text",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
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
          <div className="flex w-full justify-center gap-5">
            {/* <Input
              field={{
                name: "course",
                placeholder: "Student Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            /> */}
            {/* <Input
              field={{
                name: "Branch",
                placeholder: "Student Branch",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            /> */}
            <div className="w-full">
              <label
                htmlFor="branch"
                className="block mb-2 text-sm font-medium text-white"
              >
                Student Branch
              </label>
              <select
                required={true}
                value={branch}
                onChange={handleBranchChange}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="" disabled selected>
                  Select Branch
                </option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electronics and Telecommunication">
                  Electronics and Telecommunication
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
              </select>
            </div>
            <Input
              field={{
                name: "batch",
                placeholder: "Student Batch",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
          </div>
          <div className="w-full">
            <Input
              field={{
                name: "password",
                placeholder: "Student Password",
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
                <span>Register Student</span>
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

export default RegisterStudent;
