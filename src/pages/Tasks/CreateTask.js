import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask, fetchEmployees } from "../../reducers/tasksSlice";
import { useNavigate, Link, useParams } from "react-router-dom";
import Loader from "../Loading/Loader";
import "../../Scss/Main.scss";

const CreateTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: id,
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(taskData));
    navigate(`/tasks/${id}`);
  };

  if (!taskData) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="page_title_box">
        <h2>Create Task</h2>
      </div>

      <Link className="link" to={`/tasks/${id}`}>
        <button> &#10096; Go Back</button>
      </Link>

      <div>
        <div className="form">
          <div>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleChange}
            />

            <input
              placeholder="Description"
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              placeholder="Start Date"
              type="date"
              name="startDate"
              value={taskData.startDate}
              onChange={handleChange}
            />

            <input
              placeholder="End Date"
              type="date"
              name="endDate"
              value={taskData.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              className="input_id"
              type="text"
              name="id"
              value={id}
              onChange={handleChange}
            />
          </div>
          <button className="add_btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
