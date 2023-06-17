import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../Scss/EmployeesInfo.scss";
import { useSelector } from "react-redux";
import Loader from "../Loading/Loader";

const EmployeesInfo = () => {
  const { id } = useParams();
  const employees = useSelector((state) => state.employees);
  const employee = employees.find((emp) => emp.id === parseInt(id));
  const tasks = useSelector((state) => state.tasks.tasks);
  const data = tasks.filter((task) => task.employeeId === id);

  if (!employee) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page_title_box">
        <h1>EMPLOYEE PAGE</h1>;
      </div>

      <Link to="/" className="employees_link">
        <button> &#10096; Go Back</button>
      </Link>
      <div className="block">
        <div className="employee_page">
          <u>
            <div>
              id: <span>{employee.id}</span>{" "}
            </div>
          </u>
          <u>
            <div>
              Name: <span>{employee.name}</span>{" "}
            </div>
          </u>
          <u>
            <div>
              Surname: <span>{employee.surname}</span>
            </div>
          </u>
          <u>
            <div>
              Email: <span>{employee.email}</span>
            </div>
          </u>
          <u>
            <div>
              Position: <span>{employee.position}</span>
            </div>
          </u>
        </div>
        <div className="table">
          <div className="title">
            <div>Employees Name</div>
            <div>Description</div>
            <div>Start Date</div>
            <div>End Date</div>
          </div>

          <div className="tasks_block">
            {data.map((task) => (
              <div className="tasks_info" key={task.id}>
                <div>{task.name}</div>
                <div>{task.description}</div>
                <div>{task.startDate}</div>
                <div>{task.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeesInfo;
