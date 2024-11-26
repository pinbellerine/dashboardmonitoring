import type { Component } from 'solid-js';
import DataGrid from './DataGrid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Dashboard: Component = () => {
  return (
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <DataGrid />
    </div>
  );
};

export default Dashboard;
