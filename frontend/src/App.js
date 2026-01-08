import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated } from './utils/auth';


import Login from './pages/Login';
import HomeModern from './pages/HomeModern';
import { ComplaintForm } from './pages/complaint/index.js';
import RosterManagement from './pages/rostermanagement/RosterManagement';
import RosterView from './pages/rostermanagement/RosterView';
import UserManagement from './pages/usermanagement/UserManagement';   // Main UserManagement page

import Configuration from './pages/configuration/Configuration';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

import SelectAssigner from './pages/SelectAssigner';
import MyTasks from './pages/MyTasks';
import MainAssignment from './pages/MainAssignment';
import SubAssignment from './pages/SubAssignment';
import AllAssignments from './pages/AllAssignments.js';

// Import the ComplaintView component

// PrivateRoute component to protect routes if not logged in
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Private routes protected by PrivateRoute */}
        <Route path="/" element={<PrivateRoute><HomeModern /></PrivateRoute>} />
        <Route path="/home-modern" element={<PrivateRoute><HomeModern /></PrivateRoute>} />
        <Route path="/complaint" element={<PrivateRoute><ComplaintForm /></PrivateRoute>} />
        <Route path="/roster" element={<PrivateRoute><RosterManagement /></PrivateRoute>} />
        <Route path="/roster-view" element={<PrivateRoute><RosterView /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        {/* Removed legacy user module front collapses and related pages */}

        <Route path="/configuration" element={<PrivateRoute><Configuration /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/select-assigner" element={<PrivateRoute><SelectAssigner /></PrivateRoute>} />
        <Route path="/my-tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
        <Route path="/main-assignment" element={<PrivateRoute><MainAssignment /></PrivateRoute>} />
        <Route path="/sub-assignment" element={<PrivateRoute><SubAssignment /></PrivateRoute>} />
        <Route path="/all-assignments" element={<PrivateRoute><AllAssignments /></PrivateRoute>} />

        {/* Public pages */}
        <Route path="/about" element={<About />} />

        {/* Catch-all fallback redirects to /complaint */}
        <Route path="*" element={<Navigate to="/complaint" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
