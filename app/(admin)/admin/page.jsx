import { getDashboardData } from '@/actions/admin';
import React from 'react'
import Dashboard from './_components/dashboard';

export const metadata = {
  title: "Dashboard | EZCar Admin",
  description: "Admin dashboard for EZCar marketplace",
};

const AdminPage = async () => {
   // Fetch dashboard data
  const dashboardData = await getDashboardData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Dashboard initialData={dashboardData} />
    </div>
  )
}

export default AdminPage