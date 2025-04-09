import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateDepartment() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    photo: '',
    photoAlt: '',
    category: '',
    noOfShifts: '',
    amountOfShift: '',
    keywords: '',
    maxEnroll: ''
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchDepartments();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/categories');
      setCategories(res.data.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      Swal.fire('Error', 'Failed to fetch categories', 'error');
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/departments');
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error('Error fetching departments:', err);
      Swal.fire('Error', 'Failed to fetch departments', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/update-department/${editId}`, formData);
        Swal.fire('Success', 'Department updated successfully', 'success');
        setEditId(null);
      } else {
        await axios.post('http://localhost:8000/add-department', formData);
        Swal.fire('Success', 'Department created successfully', 'success');
      }
      setFormData({
        name: '',
        address: '',
        photo: '',
        photoAlt: '',
        category: '',
        noOfShifts: '',
        amountOfShift: '',
        keywords: '',
        maxEnroll: ''
      });
      fetchDepartments();
    } catch (err) {
      console.error('Error saving department:', err);
      Swal.fire('Error', 'Failed to save department', 'error');
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      name: dept.name || '',
      address: dept.address || '',
      photo: dept.photo || '',
      photoAlt: dept.photoAlt || '',
      category: dept.category || '',
      noOfShifts: dept.noOfShifts || '',
      amountOfShift: dept.amountOfShift || '',
      keywords: dept.keywords || '',
      maxEnroll: dept.maxEnroll || ''
    });
    setEditId(dept._id);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This department will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#a0aec0',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/delete-department/${id}`);
        Swal.fire('Deleted!', 'The department has been deleted.', 'success');
        fetchDepartments();
      } catch (err) {
        console.error('Error deleting department:', err);
        Swal.fire('Error', 'Failed to delete department.', 'error');
      }
    }
  };

  const exportToCSV = () => {
    if (departments.length === 0) {
      Swal.fire('No Data', 'There are no departments to export', 'info');
      return;
    }

    // Define columns to export
    const columns = ['name', 'address', 'category', 'noOfShifts', 'amountOfShift', 'maxEnroll', 'keywords'];
    
    // Create CSV header
    let csvContent = columns.join(',') + '\n';
    
    // Add data rows
    departments.forEach(dept => {
      const row = columns.map(col => {
        // Handle fields that might contain commas
        const value = dept[col] !== undefined ? String(dept[col]) : '';
        return value.includes(',') ? `"${value}"` : value;
      });
      csvContent += row.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'departments.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 2px solid #3182ce;
          padding-bottom: 15px;
        }
        
        h2 {
          font-size: 28px;
          color: #2c5282;
          margin: 0;
        }
        
        .back-btn {
          background-color: #3182ce;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .back-btn:hover {
          background-color: #2b6cb0;
        }
        
        .form-container {
          background-color: #f8fafc;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
          border-left: 4px solid #3182ce;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .form-grid input,
        .form-grid select {
          padding: 12px;
          border: 1px solid #cbd5e0;
          border-radius: 5px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .form-grid input:focus,
        .form-grid select:focus {
          border-color: #3182ce;
          outline: none;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
        }
        
        .submit-btn {
          grid-column: span 2;
          padding: 12px;
          background-color: #38a169;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        
        .submit-btn:hover {
          background-color: #2f855a;
        }
        
        .submit-btn.edit {
          background-color: #3182ce;
        }
        
        .submit-btn.edit:hover {
          background-color: #2b6cb0;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          margin-bottom: 15px;
        }
        
        h3 {
          font-size: 22px;
          color: #2c5282;
          margin: 0;
        }
        
        .table-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .export-btn {
          background-color: #805ad5;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: background-color 0.3s;
        }
        
        .export-btn:hover {
          background-color: #6b46c1;
        }
        
        .search-box {
          padding: 8px 12px;
          border: 1px solid #cbd5e0;
          border-radius: 5px;
          width: 250px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        
        th {
          background-color: #edf2f7;
          padding: 14px 10px;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 2px solid #cbd5e0;
        }
        
        td {
          padding: 12px 10px;
          border-bottom: 1px solid #edf2f7;
        }
        
        tr:hover {
          background-color: #f7fafc;
        }
        
        tr:last-child td {
          border-bottom: none;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .edit-btn {
          background-color: #3182ce;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .edit-btn:hover {
          background-color: #2b6cb0;
        }
        
        .delete-btn {
          background-color: #e53e3e;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .delete-btn:hover {
          background-color: #c53030;
        }
        
        .no-data {
          text-align: center;
          padding: 40px;
          color: #718096;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .submit-btn {
            grid-column: 1;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .table-actions {
            width: 100%;
          }
          
          .search-box {
            width: 100%;
          }
          
          table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="header">
        <h2>{editId ? 'Edit Department' : 'Create Department'}</h2>
        <button 
          className="back-btn"
          onClick={() => window.location.href = '/AdminDashboard'}
        >
          <span>🔙</span> Back to Dashboard
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input 
              name="name" 
              placeholder="Department Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="address" 
              placeholder="Address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="photo" 
              placeholder="Department Photo URL" 
              value={formData.photo} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="photoAlt" 
              placeholder="Photo Alt Text" 
              value={formData.photoAlt} 
              onChange={handleChange} 
              required 
            />
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <input 
              name="noOfShifts" 
              placeholder="Number of Shifts" 
              type="number" 
              value={formData.noOfShifts} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="amountOfShift" 
              placeholder="Amount Per Shift ($)" 
              type="number" 
              value={formData.amountOfShift} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="maxEnroll" 
              placeholder="Max Enrollment" 
              type="number" 
              value={formData.maxEnroll} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="keywords" 
              placeholder="Keywords (comma separated)" 
              value={formData.keywords} 
              onChange={handleChange} 
              required 
            />
            <button 
              type="submit" 
              className={`submit-btn ${editId ? 'edit' : ''}`}
            >
              {editId ? '✏️ Update Department' : '➕ Create Department'}
            </button>
          </div>
        </form>
      </div>

      <div className="section-header">
        <h3>Department List</h3>
        <div className="table-actions">
          <input
            type="text"
            placeholder="Search departments..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="export-btn" 
            onClick={exportToCSV}
          >
            📊 Export CSV
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Category</th>
            <th>Shifts</th>
            <th>Amount ($)</th>
            <th>Max Enroll</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map(dept => (
              <tr key={dept._id}>
                <td>{dept.name}</td>
                <td>{dept.category}</td>
                <td>{dept.noOfShifts}</td>
                <td>${dept.amountOfShift}</td>
                <td>{dept.maxEnroll}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(dept)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(dept._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                {departments.length === 0 ? 'No departments available' : 'No matching departments found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CreateDepartment;