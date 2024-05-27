import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const List = () => {
  const [invoiceList, setInvoiceList] = useState([
    {
      title: "Mess bill",
      date: "20-5-2023",
      amount: "Rs. 690",
      status: "pending",
    },
    {
      title: "Mess bill",
      date: "20-5-2023",
      amount: "Rs. 690",
      status: "pending",
    },
  ]);
  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));
    fetch("http://localhost:3000/api/invoice/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let invoices = data.invoices;
          let list = [];
          invoices.forEach((invoice) => {
            if (invoice.status.toLowerCase() === "pending") {
              let date = new Date(invoice.date);
              invoice.date = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              list.push({
                title: invoice.title,
                amount: "Rs. " + invoice.amount,
                status: invoice.status,
                date: invoice.date,
              });
            }
          });
          setInvoiceList(list);
        }
      });
  }, [invoiceList.length]);

  return (
    <div className="w-full max-w-md p-4 rounded-lg shadow sm:p-8 bg-neutral-950 drop-shadow-xl overflow-y-auto max-h-70">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">
          Unpaid Invoices
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-700">
          {invoiceList.map((invoice) => (
            <li className="py-3 sm:py-4" key="1">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-white">
                  {invoice.status.toLowerCase() === "pending" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">
                    {invoice.title}
                  </p>
                  <p className="text-sm truncate text-gray-400">
                    {invoice.date}
                  </p>
                </div>
                <div className="flex flex-col items-center text-base font-semibold text-white">
                  {invoice.amount}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function Home() {
  let student = JSON.parse(localStorage.getItem("student"));
  const token = localStorage.getItem("token");

  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) {
      let daysOff = 0;
      data.attendance.map((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff);
      // console.log(daysOff);
    } else {
      console.log("Error");
    }
  };

  const [studentData, setStudentData] = useState();
  const getStudent = async () => {
    const response = await fetch(
      "http://localhost:3000/api/student/get-student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: false, token }),
      }
    );

    const data = await response.json();
    // console.log(data);
    setStudentData(data);
  };

  useEffect(() => {
    getStudent();
    getAttendance();
  }, []);

  const labels = ["Days off", "Days present"];
  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const [daysOff, setDaysOff] = useState(0); //!Fetch from database

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5 max-h-screen overflow-y-auto pt-64 lg:pt-0 md:pt-64 sm:pt-96">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{student.name}!</span>
      </h1>
      <div className="flex gap-5 w-full justify-center flex-wrap">
        {/* <List /> */}
        <div className="bg-neutral-950 px-10 py-2 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-2 max-h-106 overflow-auto">
          {studentData && (
            <div className="text-gray-400 text-lg font-medium divide-y divide-gray-700">
              <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
                <p>
                  Name :{" "}
                  <span className="text-white">{studentData.student.name}</span>
                </p>
                <p>
                  Email :{" "}
                  <span className="text-white">{studentData.student.email}</span>
                </p>
                <p>
                  Mobile :{" "}
                  <span className="text-white">{studentData.student.contact}</span>
                </p>
              </div>
              <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
                <p>
                  Batch :{" "}
                  <span className="text-white">{studentData.student.batch}</span>
                </p>
                <p>
                  Branch :{" "}
                  <span className="text-white">{studentData.student.branch}</span>
                </p>
                <p>
                  Student Id :{" "}
                  <span className="text-white">
                    {studentData.student.student_id}
                  </span>
                </p>
              </div>
              <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
                <p>
                  Father :{" "}
                  <span className="text-white">
                    {studentData.student.father_name}
                  </span>
                </p>
                <p>
                  Address :{" "}
                  <span className="text-white">{studentData.student.address}</span>
                </p>
                <p>
                  Parent's Contact :{" "}
                  <span className="text-white">
                    {studentData.student.parent_contact}
                  </span>
                </p>
                <p>
                  Parent's Email :{" "}
                  <span className="text-white">
                    {studentData.student.parent_email}
                  </span>
                </p>
              </div>
              <div className="py-3 px-5 rounded sm:py-3 hover:bg-neutral-700 hover:scale-105 transition-all">
                <p>
                  Hostel :{" "}
                  <span className="text-white">{studentData.shostel.name}</span>
                </p>
                <p>
                  Room :{" "}
                  <span className="text-white">{studentData.student.room_no}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center bg-neutral-950 rounded-xl shadow-xl p-5">
          <span className="text-white text-xl">Attendance</span>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "days",
                  data: [daysOff, totalDays - daysOff],
                  backgroundColor: ["#F26916", "#1D4ED8"],
                  barThickness: 50,
                  borderColor: "rgba(0,0,0,0)",
                  hoverOffset: 10,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
