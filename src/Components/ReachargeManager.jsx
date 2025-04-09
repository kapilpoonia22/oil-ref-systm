import React, { useState } from 'react';
import './CSS/RechargeManager.css';
import { Link } from 'react-router-dom';

const RechargeManager = () => {
  const [formData, setFormData] = useState({
    department: '',
    user: '',
    shift: '',
    shiftsCount: '',
    rechargeAmount: ''
  });

  const [rows, setRows] = useState([]);

  const resetForm = () => {
    setFormData({
      department: '',
      user: '',
      shift: '',
      shiftsCount: '',
      rechargeAmount: ''
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const submitForm = () => {
    const { department, user, shift, shiftsCount, rechargeAmount } = formData;

    if (!department || !shiftsCount || !rechargeAmount) {
      alert('Please fill Department, Number of Shifts, and Recharge Amount.');
      return;
    }

    const newRow = {
      department,
      user: user || '-',
      shift: shift || '-',
      shiftsCount,
      rechargeAmount
    };

    setRows([...rows, newRow]);
    resetForm();
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const editRow = (index) => {
    const row = rows[index];
    setFormData({
      department: row.department,
      user: row.user !== '-' ? row.user : '',
      shift: row.shift !== '-' ? row.shift : '',
      shiftsCount: row.shiftsCount,
      rechargeAmount: row.rechargeAmount
    });

    deleteRow(index);
  };

  return (
    <div className="container">
      <h2>Recharge Manager</h2>

      <div className="form-group">
        <label>Choose Department (required)</label>
        <select id="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          <option>Medical</option>
          <option>Engineering</option>
          <option>Exports</option>
          <option>HR</option>
        </select>
      </div>

      <div className="form-group">
        <label>Choose User (optional)</label>
        <select id="user" value={formData.user} onChange={handleChange}>
          <option value="">Select User</option>
          <option>User A</option>
          <option>User B</option>
          <option>User C</option>
        </select>
      </div>

      <div className="form-group">
        <label>Choose Shift (optional)</label>
        <select id="shift" value={formData.shift} onChange={handleChange}>
          <option value="">Select Shift</option>
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>
      </div>

      <div className="form-group">
        <label>Number of Shifts</label>
        <input
          type="number"
          id="shiftsCount"
          value={formData.shiftsCount}
          onChange={handleChange}
          placeholder="Enter number of shifts"
        />
      </div>

      <div className="form-group">
        <label>Recharge Amount</label>
        <input
          type="number"
          id="rechargeAmount"
          value={formData.rechargeAmount}
          onChange={handleChange}
          placeholder="Enter recharge amount"
        />
      </div>

      <button className="btn btn-reset" onClick={resetForm}>Reset</button>
      <button className="btn btn-submit" onClick={submitForm}>Submit</button>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>User</th>
            <th>Shift</th>
            <th>No. of Shifts</th>
            <th>Recharge Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.department}</td>
              <td>{row.user}</td>
              <td>{row.shift}</td>
              <td>{row.shiftsCount}</td>
              <td>{row.rechargeAmount}</td>
              <td>
                <button className="btn btn-edit" onClick={() => editRow(index)}>Edit</button>
                <button className="btn btn-delete" onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Example of using Link tag */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default RechargeManager;
