import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated } from './utils/auth';


import Login from './pages/Login';
import Home from './pages/Home';
import Complaint from './pages/Complaint';
import RosterManagement from './pages/rostermanagement/RosterManagement';
import RosterView from './pages/rostermanagement/RosterView';
import UserManagement from './pages/usermanagement/UserManagement';   // Main UserManagement page
import ComplaintManagement from './pages/usermanagement/ComplaintManagement';
import Reporting from './pages/usermanagement/Reporting';
import DataAnalysis from './pages/usermanagement/DataAnalysis';
import AccessLogs from './pages/usermanagement/AccessLogs';
import AuditTrails from './pages/usermanagement/AuditTrails';

import Configuration from './pages/configuration/Configuration';
import Reports from './pages/Reports';
import Attendance from './pages/AttendanceOT';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Workflow from './pages/Workflow';

import SelectAssigner from './pages/SelectAssigner';
import MyTasks from './pages/MyTasks';
import MainAssignment from './pages/MainAssignment';
import SubAssignment from './pages/SubAssignment';
import AllAssignments from './pages/AllAssignments';

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
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/complaint" element={<PrivateRoute><Complaint /></PrivateRoute>} />
        <Route path="/roster" element={<PrivateRoute><RosterManagement /></PrivateRoute>} />
        <Route path="/roster-view" element={<PrivateRoute><RosterView /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/complaint-management" element={<PrivateRoute><ComplaintManagement /></PrivateRoute>} />
        <Route path="/reporting" element={<PrivateRoute><Reporting /></PrivateRoute>} />
        <Route path="/data-analysis" element={<PrivateRoute><DataAnalysis /></PrivateRoute>} />
        <Route path="/access-logs" element={<PrivateRoute><AccessLogs /></PrivateRoute>} />
        <Route path="/audit-trails" element={<PrivateRoute><AuditTrails /></PrivateRoute>} />

        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
        <Route path="/configuration" element={<PrivateRoute><Configuration /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/workflow" element={<PrivateRoute><Workflow /></PrivateRoute>} />
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