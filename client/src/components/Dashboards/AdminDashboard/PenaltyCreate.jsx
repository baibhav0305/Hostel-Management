import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PenaltyCreate() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const createPenalty = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let penalty = {
        name: name,
        student_id: student_id,
        email: email,
        amount: amount,
        reason: reason,
      };
      const res = await fetch(
        "http://localhost:3000/api/penalty/create-penalty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ penalty, isAdmin, hostel: hostel._id }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Penalty Issued Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setLoading(false);
        setTimeout(() => {
          navigate(-1);
        }, 3000);
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
  const [student_id, setStudentId] = useState();
  const [email, setEmail] = useState();
  const [amount, setAmount] = useState();
  const [reason, setReason] = useState();

  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">New Penalty</h1>
      <div className="md:w-[60vw] p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form
          method="post"
          onSubmit={createPenalty}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5 justify-center w-full sw-[100vw]">
            <Input
              field={{
                name: "Student Name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 justify-center w-full sw-[100vw]">
            <Input
              field={{
                name: "Student Id",
                placeholder: "Student Id",
                type: "text",
                req: true,
                value: student_id,
                onChange: (e) => setStudentId(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Student Email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Penalty Amount (₹)",
                placeholder: "Penalty Amount (₹)",
                type: "number",
                req: true,
                value: amount,
                onChange: (e) => setAmount(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "Reason for Penalty",
                placeholder: "Reason for Penalty",
                type: "text",
                req: true,
                value: reason,
                onChange: (e) => setReason(e.target.value),
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
                <span>Issue Penalty</span>
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

export default PenaltyCreate;
