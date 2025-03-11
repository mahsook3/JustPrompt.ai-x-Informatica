import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Logo from '../assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      if (error.message.includes("name already in use")) {
        toast.error("Email already in use, please login");
      } else {
        alert(error);
      }
    }
  };

  return (
    <>
            <ToastContainer />

<div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
  <div className="relative py-3 sm:max-w-xs sm:mx-auto">
    <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white rounded-xl shadow-lg">
      <div className="flex flex-col justify-center items-center h-full select-none">
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <a href="/" target="_blank">
            <img
              src={Logo}
              className="w-8"
              alt="Logo"
            />
          </a>
          <p className="m-0 text-[16px] font-semibold">
            Create Your Account
          </p>
          <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
            Get started with our app, just start section and enjoy experience.
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="font-semibold text-xs text-gray-400" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded-lg px-3 py-2 text-sm w-full outline-none"
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={onFormInputChange}
            placeholder="Email"
          />
        </div>
        <div className="w-full flex flex-col gap-2 mb-5">
          <label className="font-semibold text-xs text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-lg px-3 py-2 text-sm w-full outline-none"
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={onFormInputChange}
            placeholder="••••••••"
          />
        </div>
        <div className="w-full mt-5">
          <button
            className="py-2 px-4 bg-green-400 hover:bg-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            type="button"
            onClick={onSubmit}
          >
            Signup
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          Have an account already? <Link to="/login" className="text-green-400 hover:text-green-500">Login</Link>
        </p>
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default Signup;
