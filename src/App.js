// src/App.js
import React from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserAddForm from './components/UserAddForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {


  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<UserList/>} />
      <Route exact path="/edit-user/:id" element={<UserForm/>} />
      <Route exact path="/add-user" element={<UserAddForm/>} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
    // <div>
    //   <h1>User Management Dashboard</h1>
    //   <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
    //   <UserForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
    // </div>
  );
};

export default App;
