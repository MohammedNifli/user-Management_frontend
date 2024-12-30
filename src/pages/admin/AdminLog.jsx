import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminInfo } from '../../slices/adminSlice';

const AdminLog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    if (adminInfo) {
      navigate('/admindash');
    }
  }, [navigate, adminInfo]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailErr('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailErr('');
    }

    if (!validatePassword(password)) {
      setPasswordErr('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordErr('');
    }

    if (!valid) return;

    try {
      const response = await fetch('http://localhost:8000/api/admin/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to login');
      }

      const data = await response.json();
      localStorage.setItem('adminInfo', JSON.stringify(data));
      dispatch(setAdminInfo(data));
      navigate('/admindash');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setErr('Failed to login');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailErr) setEmailErr('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordErr) setPasswordErr('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-black">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-teal-400 mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-teal-400"
            />
            {emailErr && <p className="text-red-500 text-xs mt-1">{emailErr}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-teal-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-teal-400"
            />
            {passwordErr && <p className="text-red-500 text-xs mt-1">{passwordErr}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="text-teal-400 border border-teal-400 px-4 py-2 rounded hover:bg-teal-400 hover:text-gray-900 transition duration-300"
            >
              LOGIN
            </button>
            {err && <p className='text-red-500 text-xs mt-1'>{err}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLog;

