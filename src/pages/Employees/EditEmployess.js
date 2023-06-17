import { editEmployee } from "../../reducers/employeesReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../Scss/Main.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../Loading/Loader";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const employee = employees.find((item) => item.id === parseInt(id));

  const [name, setName] = useState(employee ? employee.name : "");
  const [surname, setSurname] = useState(employee ? employee.surname : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [position, setPosition] = useState(employee ? employee.position : "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      id,
      employeeData: { name, surname, email, position },
    };
    dispatch(editEmployee(updatedEmployee));
    navigate("/employees");
  };

  if (!employees) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page_title_box">
        <h2>Edit Employee</h2>
      </div>

      <Link to="/employees/" className="employees_link">
        <button> &#10096; Go Back</button>
      </Link>

      <div className="form">
        <div>
          <input
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <input
            placeholder="Surname"
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={handleSurnameChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            placeholder="Position"
            type="text"
            id="position"
            name="position"
            value={position}
            onChange={handlePositionChange}
            required
          />
        </div>

        <button className="add_btn" type="submit" onClick={handleSubmit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;