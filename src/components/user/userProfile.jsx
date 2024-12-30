import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userInfoStr = localStorage.getItem('userInfo');
        console.log('userInfo from localStorage:', userInfoStr);

        if (!userInfoStr) {
          throw new Error('No userInfo found in localStorage');
        }

        const userInfo = JSON.parse(userInfoStr);
        const { _id, name, email } = userInfo;
        console.log('Retrieved _id:', _id);

        if (!_id) {
          throw new Error('User ID not found in userInfo');
        }

        const response = await fetch(`http://localhost:8000/api/users/profile/${_id}`, {
          method: 'GET',
          headers: {
            // Optionally, you can send additional headers here if needed
          }
        });

        const data = await response.json();
        console.log("kittiyo",data)

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }

        setUser(data); // Assuming data contains the entire user profile
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-700 mb-8">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">User Not Found</h1>
          <p className="text-gray-700 mb-8">User profile data not found.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">User Profile</h1>
        <div className="flex items-center justify-center mb-8">
          <img
            src={user.user.profileImage}
            alt="User Avatar"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <p className="text-gray-700 mb-4">
          Welcome, {user.user.name}
        </p>
        <p className="text-gray-700 mb-8">
          Email: {user.user.email}
        </p>
        {/* Display other user information as needed */}
      </div>
    </div>
  );
};


export default UserProfile;
