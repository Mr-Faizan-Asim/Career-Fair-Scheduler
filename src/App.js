// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScheduleList from './components/ScheduleList';
import AdminPanel from './components/AdminPanel';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Schedule List */}
          <Route index element={<ScheduleList />} />
          {/* Details Page */}
          <Route path="details" element={<Details/>} />
          {/* Admin Panel (for adding/updating/deleting schedules) */}
          <Route path="admin" element={<AdminPanel />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
