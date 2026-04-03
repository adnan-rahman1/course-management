import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    departmentId: "",
    role: "student" // ✅ default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          departmentId: Number(formData.departmentId),
          role: formData.role // ✅ send role
        }
      );

      // ✅ store user info (auto login)
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);

      alert(response.data.message);

      navigate(response.data.redirect);

    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* DEPARTMENT */}
          <div className="form-group">
            <label>Department ID</label>
            <input
              type="number"
              name="departmentId"
              placeholder="Enter department ID"
              value={formData.departmentId}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🔥 ROLE SELECT */}
          <div className="form-group">
            <label>Register As</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="advisor">Advisor</option>
            </select>
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>

        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
}