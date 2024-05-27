import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import { getAllStudents } from "../../../../utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));

  const [allStudents, setallStudents] = useState([]);

  const getRequests = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    // console.log(hostel);
    const res = await fetch("http://localhost:3000/api/leave/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        (req.title = `${req.student.name} [ Room: ${req.student.room_no}]`),
          (req.desc = `${req.from} to ${req.to}`);
      });
      setLeaveReqs(data.list);
    }
  };

  const getSuggestions = async () => {
    const res = await fetch("http://localhost:3000/api/suggestion/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      setSuggestions(data.suggestions);
    }
  };

  const getComplaints = async () => {
    const res = await fetch("http://localhost:3000/api/complaint/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      let arr = data.complaints.filter((comp) => comp.status === "pending");

      setComplaints(arr);
    }
  };

  const getAll = async () => {
    const data = await getAllStudents();
    // console.log(data);
    setallStudents(data.students);
  };

  const [leaveReqs, setLeaveReqs] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const messIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  const suggestionIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  useEffect(() => {
    getAll();
    getRequests();
    getComplaints();
    getSuggestions();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{admin.name || "admin"}!</span>
      </h1>
      {isSuper ? (
        <h1 className="text-white text-xl">Super Admin</h1>
      ) : (
        <h1 className="text-white text-xl">
          Manager, {hostel.name || "hostel"}
        </h1>
      )}
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={allStudents.length} />
        <ShortCard title="Total Complaints" number={complaints.length} />
        <ShortCard title="Total Suggestions" number={suggestions.length} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        <List list={leaveReqs} title="leave" icon={messIcon} />
        {/* {graph} */}
        <List list={suggestions} title="suggestions" icon={suggestionIcon} />
      </div>
    </div>
  );
}

export default Home;
