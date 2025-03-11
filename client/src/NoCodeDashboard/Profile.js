import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ email, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobile) {
      toast.error('Please fill in all fields.');
      return;
    }

    const userDetails = {
      name,
      mobileNumber: mobile,
      email,
    };

    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/userdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          projectId: '66dc452ca54723b1c14ba1e9',
          environmentId: '66dc452ca54723b1c14ba1ea',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('User details saved successfully!');
      window.location.href = '/login'; // Redirect to login page
      return; // Ensure no further code is executed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center mt-20 px-8">
      <form className="max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
            Account settings:
          </h2>
          <div className="flex flex-col gap-2 w-full border-gray-400">
            <div>
              <label className="text-gray-600 dark:text-gray-400">Name</label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400">Email</label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400">Mobile</label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="py-1.5 px-3 m-1 text-center bg-green-400 border rounded-md text-white  hover:bg-green-600 hover:text-gray-100 dark:text-gray-200 dark:bg-green-400"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}