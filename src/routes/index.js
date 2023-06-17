
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployees from '../pages/Employees/CreateEmployees';
import Employees from '../pages/Employees/Employees';
import TasksPage from '../pages/Tasks/TasksPage';
import EditEmployess from '../pages/Employees/EditEmployess';
import EmployeesInfo from '../pages/Employees/EmployeesInfo';
import EditTask from '../pages/Tasks/EditTask';
import CreateTask from '../pages/Tasks/CreateTask';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/create" element={<CreateEmployees />} />
        <Route path="/edit/:id" element={<EditEmployess />} />
        <Route path="/employeesInfo/:id" element={<EmployeesInfo />} />
        <Route path="/tasks/:id" element={<TasksPage />} />
        <Route path="/edit/tasks/:id" element={<EditTask />} />
        <Route path="/create/tasks/:id" element={<CreateTask />} />
      </Routes>
    </Router>
  );
};

export default Routing;
