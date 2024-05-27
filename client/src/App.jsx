import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/LandingSite/About/index";
import Contact from "./components/LandingSite/Contact/index";
import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/index";
import Auth from "./components/LandingSite/AuthPage/Index";
import SignIn from "./components/LandingSite/AuthPage/SignIn";
import RequestAcc from "./components/LandingSite/AuthPage/Request";
import AdminSignIn from "./components/LandingSite/AuthPage/AdminSignIn";
import Index from "./components/Dashboards/StudentDashboard/Index";
import Home from "./components/Dashboards/StudentDashboard/Home";
import Leave from "./components/Dashboards/StudentDashboard/Leave";
import Attendance from "./components/Dashboards/StudentDashboard/Attendance";
import Invoices from "./components/Dashboards/StudentDashboard/Invoices";
import Suggestions from "./components/Dashboards/StudentDashboard/Suggestions";
import Complaints from "./components/Dashboards/StudentDashboard/Complaints";
import Settings from "./components/Dashboards/StudentDashboard/Settings";
import AdminIndex from "./components/Dashboards/AdminDashboard/Index";
import AdminHome from "./components/Dashboards/AdminDashboard/Home/Home";
// import RegisterStudent from "./components/Dashboards/AdminDashboard/RegisterStudent";z
import AdminAttendance from "./components/Dashboards/AdminDashboard/Attendance";
import AdminComplaints from "./components/Dashboards/AdminDashboard/Complaints";
import AdminInvoices from "./components/Dashboards/AdminDashboard/Invoices";
import AdminSuggestions from "./components/Dashboards/AdminDashboard/Suggestions";
import AdminSettings from "./components/Dashboards/AdminDashboard/Settings";
import AllStudents from "./components/Dashboards/AdminDashboard/AllStudents";
import Student from "./components/Dashboards/AdminDashboard/Student";
import AdminLeave from "./components/Dashboards/AdminDashboard/Leave";
import SuperAdminIndex from "./components/Dashboards/SuperAdminDashBoard/Index";
import SuperAdminHome from "./components/Dashboards/SuperAdminDashBoard/Home/Home";
import AllStudentsSuper from "./components/Dashboards/SuperAdminDashBoard/AllStudent";
import RegisterAdmin from "./components/Dashboards/SuperAdminDashBoard/RegisterAdmin";
import RegisterStudent from "./components/Dashboards/SuperAdminDashBoard/RegisterStudent";
import Hostel from "./components/Dashboards/SuperAdminDashBoard/Hostel";
import HostelCreate from "./components/Dashboards/SuperAdminDashBoard/HostelCreate";
import EditDetails from "./components/Dashboards/StudentDashboard/EditDetails";
import Mess from "./components/Dashboards/SuperAdminDashBoard/Mess";
import RequestHostel from "./components/Dashboards/StudentDashboard/RequestHostel";
import HostelChange from "./components/Dashboards/SuperAdminDashBoard/HostelChange";
import Penalty from "./components/Dashboards/AdminDashboard/Penalty";
import PenaltyCreate from "./components/Dashboards/AdminDashboard/PenaltyCreate";
import PenaltyStudent from "./components/Dashboards/StudentDashboard/Penalty";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingSite />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route path="login" element={<SignIn />} />
            <Route path="request" element={<RequestAcc />} />
            <Route path="admin-login" element={<AdminSignIn />} />
          </Route>
        </Route>
        <Route path="/student-dashboard" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="leave" element={<Leave />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit-details" element={<EditDetails />} />
          <Route path="hostel-change" element={<RequestHostel />} />
          <Route path="penalty" element={<PenaltyStudent />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminIndex />}>
          <Route index element={<AdminHome />} />
          {/* <Route path="register-student" element={<RegisterStudent />} /> */}
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="suggestions" element={<AdminSuggestions />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="student/:id" element={<Student />} />
          <Route path="leave" element={<AdminLeave />} />
          <Route path="penalty" element={<Penalty />} />
          <Route path="penalty/create-penalty" element={<PenaltyCreate />} />
        </Route>
        <Route path="/super-admin-dashboard" element={<SuperAdminIndex />}>
          <Route index element={<SuperAdminHome />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="register-admin" element={<RegisterAdmin />} />
          <Route path="all-students" element={<AllStudentsSuper />} />
          <Route path="student/:id" element={<Student />} />
          <Route path="hostel" element={<Hostel />} />
          <Route path="hostel/create-hostel" element={<HostelCreate />} />
          <Route path="mess" element={<Mess />} />
          <Route path="hostel-change" element={<HostelChange />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
