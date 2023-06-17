import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateTask, fetchTasks } from '../../reducers/tasksSlice';
import Loader from "../Loading/Loader";
import "../../Scss/Main.scss";

const EditTask = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      setTaskData(task);
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, taskData }));
    navigate(`/tasks/${taskData.employeeId}`);
  };

  if (!taskData) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page_title_box">
        <h2>Edit Task</h2>
      </div>

      <Link to={`/tasks/${taskData.employeeId}`} className="employees_link">
        <button> &#10096; Go Back</button>
      </Link>

      <div className="form">

        <div>
          <input placeholder="Name" type="text" name="name" value={taskData.name || ''} onChange={handleChange} />

          <input placeholder="Description" type="text" name="description" value={taskData.description || ''} onChange={handleChange} />

          <input placeholder="Start Date" type="date" name="startDate" value={taskData.startDate || ''} onChange={handleChange} />
        </div>
        <div>
          <input placeholder="End Date" type="date" name="endDate" value={taskData.endDate || ''} onChange={handleChange} />

          <input placeholder="Employee" type="text" name="employeeId" value={taskData.employeeId || ''} onChange={handleChange} />
        </div>
        <button className="add_btn" onClick={handleSubmit}>Edit</button>
      </div>
    </div>
  );
};

export default EditTask;
