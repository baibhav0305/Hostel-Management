import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
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
  const isSuper = JSON.parse(localStorage.getItem("isSuper"));

  const [allStudents, setallStudents] = useState([]);
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
  }, [allStudents.length, allHostels.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{admin.name || "admin"}!</span>
      </h1>
      <h1 className="text-white text-xl">Super Admin</h1>
      <p className="text-4xl font-bold pl-2 text-blue-400">
        IIIT Bhubaneswar
      </p>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={allStudents.length} />
        <ShortCard title="Total Hostels" number={allHostels.length} />
      </div>
      {/* <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        <List list={messReqs} title="mess" icon={messIcon} />
        {graph}
        <List list={suggestions} title="suggestions" icon={suggestionIcon} />
      </div> */}
    </div>
  );
}

export default Home;
