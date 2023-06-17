import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchTasks, deleteTask } from "../../reducers/tasksSlice";
import Loader from "../Loading/Loader";
import "../../Scss/TasksPage.scss";

const TasksPage = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const data = tasks.filter((task) => task.employeeId === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  if (!tasks) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="page_title_box">
        <h2>Tasks</h2>
      </div>
      <div className="btnBlock">
        <Link to="/employees/" className="link">
          <button> &#10096; Go Back</button>
        </Link>

        <Link to={`/create/tasks/${id}`} className="link">
          <button>Create</button>
        </Link>

        
      </div>
      <div className="table_tasks">
        <div className="title">
          <div>Employees Name</div>
          <div>Description</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Employee ID</div>
          <div></div>
        </div>

        <div className="tasks_block">
          {data && data.map((task) => (
            <div key={task.id} className="tasks_info">
              <Link to={`/employeesInfo/${id}`} className="link_Tasks">
                {task.name}
              </Link>
              <div>{task.description}</div>
              <div>{task.startDate}</div>
              <div>{task.endDate}</div>
              <div>{task.employeeId}</div>
              <div>
                <button
                  className="DeleteButton"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
                <Link to={`/edit/tasks/${task.id}`}>
                  <button className="EditButton">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
