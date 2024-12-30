// src/components/Home.jsx
import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Home = () => {
  const loggedIn = useSelector(state => state.auth.userInfo !== null);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/logout", {
        method: 'POST',
        // credentials: 'include', // Include credentials to ensure cookies are sent
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Dispatch the logout action
      dispatch(logout());

      // Clear any other client-side storage if needed
      localStorage.removeItem('userInfo');

      // Navigate to the login page
      navigate('/login');

      console.log('Successfully logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Our Website</h1>

        <p className="text-gray-700 mb-8">
          We are glad to have you here. Explore our site to learn more about what we offer.
        </p>
        <div className="flex justify-center space-x-4">
          {loggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
              <Link
                to="/editPro"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit User
              </Link>
              <Link
                to="/userPro"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                User Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
