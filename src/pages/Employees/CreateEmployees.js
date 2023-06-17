import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../reducers/employeesReducer';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loading/Loader';
import "../../Scss/Main.scss";

const CreateEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee(formData));
    setFormData({
      name: '',
      surname: '',
      email: '',
      position: '',
    });
    navigate("/employees");
  };

  
  if (!formData) {
    return     <Loader />;
  }

  return (
    <div className='container'>

      <div className='page_title_box'>
        <h2>Create Employee</h2>
      </div>

      <Link to="/employees" className='link'>
        <button> &#10096;  Go Back</button>
      </Link>

      <div className='form'>
        <div>
          <input placeholder='Name' type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          <input placeholder="Surname" type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required />

        </div>
        <div>
          <input placeholder='Email' type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          <input placeholder='Position' type="text" id="position" name="position" value={formData.position} onChange={handleInputChange} required />
        </div>

        <button className='add_btn' type="submit" onClick={handleSubmit}>ADD</button>
      </div>
    </div>
  );
};

export default CreateEmployees;
