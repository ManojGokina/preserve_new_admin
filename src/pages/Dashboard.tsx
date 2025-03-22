import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Users from '../components/dashboard/Users';
import Docs from '../components/dashboard/Docs';
import NewUser from '../components/dashboard/NewUser';

function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </DashboardLayout>
  );
}

export default Dashboard;