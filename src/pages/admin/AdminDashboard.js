import React from 'react';
import { AdminNav } from '../../components/nav/AdminNav';

export const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col mt-2'>
          <h4>Admin Dashboard</h4>
        </div>
      </div>
    </div>
  );
};
