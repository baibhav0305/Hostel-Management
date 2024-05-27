import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Student() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const [student, setStudent] = useState();
  const [attendace, setAttendance] = useState();
  const [leave, setLeave] = useState();
  const [complaint, setComplaint] = useState();

  const { id } = useParams();

  const getStudent = async () => {
    const response = await fetch(
      "http://localhost:3000/api/student/get-student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin, id }),
      }
    );

    const data = await response.json();
    // console.log(data);
    setStudent(data);

    // console.log(data);
    // const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    // const response = await fetch(`http://localhost:3000/api/complaint/hostel`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ hostel }),
    // });
    // const data = await response.json();
    // if (data.success) {
    //   const complaints = [];
    //   data.complaints.map((complaint) => {
    //     let date = new Date(complaint.date);
    //     complaints.unshift({
    //       id: complaint._id,
    //       type: complaint.type,
    //       title: complaint.title,
    //       desc: complaint.description,
    //       student: complaint.student.name,
    //       room: complaint.student.room_no,
    //       status: complaint.status,
    //       date: date.toLocaleDateString("en-US", {
    //         day: "numeric",
    //         month: "long",
    //         year: "numeric",
    //       }),
    //     });
    //   });
    //   setAllComplaints(complaints);
    //   const resolved = complaints.filter(
    //     (complaint) => complaint.status.toLowerCase() !== "pending"
    //   );
    //   setResolvedComplaints(resolved);
    //   setComplaints(
    //     complaints.filter(
    //       (complaint) => complaint.status.toLowerCase() === "pending"
    //     )
    //   );
    // } else console.log(data);
  };

  const getAttendance = async () => {
    const response = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: id }),
    });

    const data = await response.json();
    console.log(data);
    setAttendance(data);
  };

  const getLeaves = async () => {
    const response = await fetch("http://localhost:3000/api/leave/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: id }),
    });

    const data = await response.json();
    console.log(data);
    setAttendance(data);
  };

  const getComplaints = async () => {
    const response = await fetch(
      "http://localhost:3000/api/complaint/student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student: id }),
      }
    );

    const data = await response.json();
    console.log(data);
    setAttendance(data);
  };

  //!AFTER FETCH FILL THIS WITH COMPLAINT DATA
  const [unsolvedComplaints, setComplaints] = useState([]);

  const [resolvedComplaints, setResolvedComplaints] = useState([]); //!DO NOT FILL THIS WITH DATA FROM FETCH
  const [allComplaints, setAllComplaints] = useState([]); //!AFTER FETCH FILL THIS WITH COMPLAINT DATA

  const dismissComplaint = async (id) => {
    const response = await fetch(
      "http://localhost:3000/api/complaint/resolve/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    if (data.success) {
      toast.success("Complaint Dismissed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setComplaints(allComplaints.filter((complaint) => complaint.id !== id));
      setResolvedComplaints(
        resolvedComplaints.concat(
          allComplaints.filter((complaint) => complaint.id === id)
        )
      );
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getStudent();
    // getAttendance();
    // getLeaves();
    // getComplaints();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Student Details</h1>
      <div className="bg-neutral-950 px-10 py-2 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-2 max-h-106 overflow-auto">
        {student && (
          <div className="text-gray-400 text-lg font-medium divide-y divide-gray-700">
            <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
              <p>
                Name :{" "}
                <span className="text-white">{student.student.name}</span>
              </p>
              <p>
                Email :{" "}
                <span className="text-white">{student.student.email}</span>
              </p>
              <p>
                Mobile :{" "}
                <span className="text-white">{student.student.contact}</span>
              </p>
            </div>
            <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
              <p>
                Batch :{" "}
                <span className="text-white">{student.student.batch}</span>
              </p>
              <p>
                Branch :{" "}
                <span className="text-white">{student.student.branch}</span>
              </p>
              <p>
                Student Id :{" "}
                <span className="text-white">{student.student.student_id}</span>
              </p>
            </div>
            <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
              <p>
                Father :{" "}
                <span className="text-white">
                  {student.student.father_name}
                </span>
              </p>
              <p>
                Address :{" "}
                <span className="text-white">{student.student.address}</span>
              </p>
              <p>
                Parent's Contact :{" "}
                <span className="text-white">
                  {student.student.parent_contact}
                </span>
              </p>
              <p>
                Parent's Email :{" "}
                <span className="text-white">
                  {student.student.parent_email}
                </span>
              </p>
            </div>
            <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
              <p>
                Hostel :{" "}
                <span className="text-white">{student.shostel.name}</span>
              </p>
              <p>
                Room :{" "}
                <span className="text-white">{student.student.room_no}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default Student;
