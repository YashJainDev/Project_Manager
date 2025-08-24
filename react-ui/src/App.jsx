/*==============================
Importing the Core packages
==============================*/
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*==============================
Importing all the Components
==============================*/
import Home from "./Pages/Home/index.jsx";
import AuthEntry from "./Pages/Auth/index.jsx";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

/*==============================
Importing all the Protected Routes
==============================*/
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard/index.jsx";
import Profile from "./Pages/Profile/index.jsx";
import Project from "./Pages/Project/index.jsx";

export default function App() {

  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/auth/:type" element={<AuthEntry/>} />
        {/*==============================
        For all the Routes That require Authorization and Authentication        
        ==============================*/}
        <Route element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/project" element={< Project/>}></Route>
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}
