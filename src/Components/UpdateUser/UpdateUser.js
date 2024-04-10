// EditProfile.js
import React, { useState } from "react";
import basestyle from "../Base.module.css"
import "./UpdateUser.css"
const EditProfile = ({ userProfile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fname: userProfile.fname,
    lname: userProfile.lname,
    email: userProfile.email,
    password: userProfile.password,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      errors.fname = "First name is required";
    }
    if (!values.lname) {
      errors.lname = "Last name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <div className='UpdateUser'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
          <p className={basestyle.error}>{formErrors.fname}</p>
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          <p className={basestyle.error}>{formErrors.lname}</p>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
        </div>
        <button type="submit">Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile;
