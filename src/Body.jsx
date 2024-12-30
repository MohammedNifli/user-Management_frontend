
import React from 'react';
import Header from './components/user/Header.jsx';
import Signup from './pages/Signup.jsx';
import SignIn from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import UserProfile from './components/user/userProfile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//admin-side
import AdminLog from './pages/admin/AdminLog.jsx';
import AdminDash from './pages/admin/AdminDash.jsx';
import EditUser from './components/admin/editUser.jsx';
import AddUser from './components/admin/addUser.jsx';

const Body = () => {
  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
       <Route path='/login' element={<SignIn/>}/>
       <Route path='/editPro' element={<EditProfile/>}/>
       <Route path='/userPro' element={<UserProfile/>}/>
       <Route path='/adminlog' element={<AdminLog/>}/>
       <Route path='/admindash' element={<AdminDash/>}/>
       <Route path='/edit/:userId' element={<EditUser/>}/>
       <Route path='/add' element={<AddUser/>}/>
       
      </Routes>
    </Router>
  );
};

export default Body;
