import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../slices/adminSlice'; // Adjust import based on your slice

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.admin.setAdminInfo !== null);

  // Data fetching backend-to-frontend
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/fetch", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log("dataas", data);
        setUsers(data); // Update users state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error as needed, e.g., show an error message to the user
      }
    };

    fetchUsers();
  }, []);

  // Logout handling
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/logout', {
        method: 'POST',
      });
      console.log("resp", response);

      if (response.ok) {
        // Dispatch logout action if the server logout is successful
        dispatch(logoutAdmin());
        navigate('/adminlog');

        // You can add any additional client-side logout logic here if needed
        console.log('Successfully logged out');
      } else {
        // Handle unsuccessful logout if needed
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/api/admin/deleteUser/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        console.log('User deleted successfully');
        // Update the users state to remove the deleted user
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        // Handle error state or display an error message
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <button onClick={handleLogout} className="bg-red-200 hover:bg-red-300 text-red-700 font-bold py-2 px-4 rounded">
            Logout
          </button>
          <Link to={`/add`}>
          <button  className="bg-blue-500 hover:bg-blue-800 text-white-700 font-bold py-2 px-4 rounded">
            Add User
          </button>
          </Link>
          
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            {/* Add any additional controls here */}
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Image</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Role</th>
          <th className="py-3 px-6 text-left">Status</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {users.map((user, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">N/A</span>
                </div>
              )}
            </td>
            <td className="py-3 px-6 text-left">{user.name}</td>
            <td className="py-3 px-6 text-left">{user.email}</td>
            <td className="py-3 px-6 text-left">User</td>
            <td className="py-3 px-6 text-left">Offline</td>
            <td className="py-3 px-6 text-center">
              <div className="flex justify-center">
                <Link
                  to={`/edit/${user._id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

