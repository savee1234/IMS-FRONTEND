import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './pages/Login';
import Home from './pages/Home';
import ComplaintForm from './pages/Complaint';
import RosterManagement from './pages/RosterManagement';
import UserManagement from './pages/UserManagement';   // Main UserManagement page

import Configuration from './pages/Configuration';
import Reports from './pages/Reports';
import Attendance from './pages/AttendanceOT';
import About from './pages/About';
import Contact from './pages/Contact';
import Notification from './pages/Notification';
import Workflow from './pages/Workflow';

import SelectAssigner from './pages/SelectAssigner';
import PendingAssignments from './pages/PendingAssignments';
import MyTasks from './pages/MyTasks';

import ComplaintManagement from './pages/ComplaintManagement';

// PrivateRoute component to protect routes if not logged in
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('staff'); // check login
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Private routes protected by PrivateRoute */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/complaint" element={<PrivateRoute><ComplaintForm /></PrivateRoute>} />
        <Route path="/roster" element={<PrivateRoute><RosterManagement /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />

        

        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
        <Route path="/configuration" element={<PrivateRoute><Configuration /></PrivateRoute>} />
        <Route path="/reporting" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path="/workflow" element={<PrivateRoute><Workflow /></PrivateRoute>} />
        <Route path="/select-assigner" element={<PrivateRoute><SelectAssigner /></PrivateRoute>} />
        <Route path="/pending-assignments" element={<PrivateRoute><PendingAssignments /></PrivateRoute>} />
        <Route path="/my-tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />

        <Route path="/complaint-management" element={<PrivateRoute><ComplaintManagement /></PrivateRoute>} />

        {/* Public pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Catch-all fallback redirects to /complaint */}
        <Route path="*" element={<Navigate to="/complaint" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
