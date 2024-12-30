import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userInfo);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      console.error('User info not found in local storage.');
      alert('User not logged in.');
      return;
    }

    const { _id } = JSON.parse(userInfo);
    const url = `http://localhost:8000/api/users/profile/${_id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Updated User:', data);

      // Assuming you have a Redux action to update user credentials
      dispatch(setCredentials(data));
      alert('Profile updated successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Update Profile</h1>
        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
