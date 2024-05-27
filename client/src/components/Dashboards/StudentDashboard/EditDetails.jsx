import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditDetails() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const editDetails = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let details = {
        contact: contact,
        parent_contact: parent_contact,
        address: address,
      };
      const res = await fetch(
        "http://localhost:3000/api/student/update-student",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ details, student: student._id }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Details Updated Successfully!", {
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

  const [contact, setContact] = useState();
  const [parent_contact, setParentContact] = useState();
  const [address, setAddress] = useState();

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getStudentData = async () => {
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
    setContact(data.student.contact);
    setParentContact(data.student.parent_contact);
    setAddress(data.student.address);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Edit Details
      </h1>
      <div className="md:w-[60vw] p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form
          method="post"
          onSubmit={editDetails}
          className="flex flex-col gap-3"
        >
          <div className="flex gap-5 justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "Edit Contact",
                placeholder: "Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Edit Parent Contact",
                placeholder: "Parent Contact",
                type: "text",
                req: true,
                value: parent_contact,
                onChange: (e) => setParentContact(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full justify-center">
            <Input
              field={{
                name: "Edit Address",
                placeholder: "Address",
                type: "text",
                req: true,
                value: address,
                onChange: (e) => setAddress(e.target.value),
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Editing...
                </>
              ) : (
                <span>Edit Detais</span>
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

export default EditDetails;
