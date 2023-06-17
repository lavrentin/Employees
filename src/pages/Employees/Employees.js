import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../reducers/employeesReducer";
import { Link } from "react-router-dom";
import "../../Scss/EmployeesPage.scss";
import Loader from "../Loading/Loader";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  };

  if (!employees) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page_title_box">
        <h1>EMPLOYEES</h1>
      </div>

      <Link to="/create" className="create_link">
        <button>Create</button>
      </Link>

      <div className="table">
        <div className="title">
          <div>Name</div>
          <div>Surname</div>
          <div>Email</div>
          <div>Position</div>
          <div>Tasks</div>
          <div></div>
        </div>

        <div className="employees_block">
          {employees.map((employee) => (
              <div key={employee.id} className="employees_info">
                <Link
                  to={`/employeesInfo/${employee.id}`}
                  className="link_Employees"
                >
                  {employee.name}
                </Link>
                <div>{employee.surname}</div>
                <div>{employee.email}</div>
                <div>{employee.position}</div>
                <Link
                  to={`/tasks/${employee.id}`}
                  className="link_Employees"
                >tasks</Link>
                <div>
                  <Link to={`/edit/${employee.id}`}>
                    <button
                      className="EditButton"
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="DeleteButton"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;
