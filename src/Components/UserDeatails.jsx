import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { FaSearch, FaFileExport, FaArrowLeft, FaEdit, FaTrash, FaEye, FaUserPlus, FaSync, FaBan, FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

function UserDetails() {
  // CSS Styles
  const styles = {
    container: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '"Poppins", Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0',
      borderLeft: '4px solid #3182ce',
      paddingLeft: '12px',
    },
    buttonsContainer: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    exportButton: {
      backgroundColor: '#3182ce',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '500',
      border: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    addButton: {
      backgroundColor: '#38a169',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      border: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    refreshButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      border: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blockedListButton: {
      backgroundColor: '#9c4221',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      border: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '24px',
      width: '100%',
      maxWidth: '500px',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0',
    },
    searchInput: {
      padding: '14px',
      paddingLeft: '36px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      width: '100%',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    spinner: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      border: '3px solid #3182ce',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingMessage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 0',
      color: '#718096',
      fontSize: '16px',
    },
    noDataMessage: {
      textAlign: 'center',
      color: '#718096',
      padding: '40px',
      fontSize: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e0',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '32px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      border: '1px solid #e2e8f0',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#475569',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      marginBottom: '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#4a5568',
    },
  };

  // Keyframes for spinner animation
  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .hover-effect:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .action-button {
      padding: 6px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      margin-right: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .view-button {
      background-color: #3182ce;
      color: white;
    }
    
    .view-button:hover {
      background-color: #2c5282;
    }
    
    .edit-button {
      background-color: #eab308;
      color: white;
    }
    
    .edit-button:hover {
      background-color: #b45309;
    }
    
    .delete-button {
      background-color: #e53e3e;
      color: white;
    }
    
    .delete-button:hover {
      background-color: #c53030;
    }

    .block-button {
      background-color: #9c4221;
      color: white;
    }
    
    .block-button:hover {
      background-color: #7b341e;
    }

    .unblock-button {
      background-color: #38a169;
      color: white;
    }
    
    .unblock-button:hover {
      background-color: #2f855a;
    }
    
    input:focus, button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
    }
    
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .badge-active {
      background-color: #c6f6d5;
      color: #22543d;
    }
    
    .badge-inactive {
      background-color: #fed7d7;
      color: #822727;
    }

    .badge-blocked {
      background-color: #fbd38d;
      color: #7b341e;
    }
    
    .main-table {
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
    }
    
    .rdt_TableHead {
      background-color: #f7fafc !important;
    }
    
    .rdt_TableHeadRow {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      overflow: hidden;
    }
    
    .rdt_TableRow:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  `;

  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState('fullname');
  const [sortDirection, setSortDirection] = useState('asc');
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:8000/employees');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullname?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.contact?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.address?.toLowerCase().includes(filterText.toLowerCase()) ||
      String(user.status).toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredUsers(filtered);
    setTotalUsers(filtered.length);
  }, [filterText, users]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be a fetch request to your API
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        
        if (result.status === 'success') {
          // Process the received data
          const processedUsers = result.data.map(user => ({
            ...user,
            status: user.status || (Math.random() > 0.3 ? 'Active' : 'Inactive'),
            blockReason: user.blockReason || '',
            isBlocked: user.isBlocked || false
          }));
          setUsers(processedUsers);
          setTotalUsers(processedUsers.length);
          
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Employee data loaded successfully',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          throw new Error(result.message || 'Failed to load employee data');
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Fallback to mock data if API fails
        const mockUsers = generateMockEmployees();
        setUsers(mockUsers);
        setTotalUsers(mockUsers.length);
        
        Swal.fire({
          icon: 'warning',
          title: 'Using mock data',
          text: 'Could not connect to server, using demo data instead',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load employee data',
        confirmButtonColor: '#3182ce'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock employee data for testing
  const generateMockEmployees = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      fullname: `Employee ${i + 1}`,
      email: `employee${i + 1}@example.com`,
      contact: `+1 ${Math.floor(100000000 + Math.random() * 900000000)}`,
      address: `${Math.floor(100 + Math.random() * 9900)} Main St, City ${i + 1}`,
      status: Math.random() > 0.3 ? 'Active' : 'Inactive',
      numberOfShifts: Math.floor(Math.random() * 50),
      password: 'password123', // Just for mock data
      isBlocked: Math.random() > 0.8,
      blockReason: Math.random() > 0.8 ? 'Violation of company policy' : '',
      blockedAt: Math.random() > 0.8 ? new Date().toISOString() : null
    }));
  };

  const handleSort = (column, direction) => {
    let fieldName = column.selector;
    
    if (typeof column.selector === 'function') {
      fieldName = column.name ? column.name.toLowerCase() : 'fullname';
    } else if (typeof column.selector === 'object' && column.selector !== null) {
      fieldName = column.selector.name || 'fullname';
    }
    
    setSortField(fieldName);
    setSortDirection(direction);
  };

  const handleView = (row) => {
    Swal.fire({
      title: `${row.fullname}`,
      html: `
        <div style="text-align: left; margin-top: 20px;">
          <p><strong>Email:</strong> ${row.email || 'N/A'}</p>
          <p><strong>Contact:</strong> ${row.contact || 'N/A'}</p>
          <p><strong>Address:</strong> ${row.address || 'N/A'}</p>
          <p><strong>Status:</strong> ${row.status || 'N/A'}</p>
          <p><strong>Shifts:</strong> ${row.numberOfShifts || '0'}</p>
          ${row.isBlocked ? `<p><strong>Block Reason:</strong> ${row.blockReason || 'No reason provided'}</p>` : ''}
          ${row.isBlocked && row.blockedAt ? `<p><strong>Blocked At:</strong> ${new Date(row.blockedAt).toLocaleString()}</p>` : ''}
        </div>
      `,
      confirmButtonColor: '#3182ce',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const handleEdit = (row) => {
    Swal.fire({
      title: 'Edit Employee',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name</label>
            <input id="fullname" class="swal2-input" value="${row.fullname || ''}" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
            <input id="email" class="swal2-input" value="${row.email || ''}" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Contact</label>
            <input id="contact" class="swal2-input" value="${row.contact || ''}" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Address</label>
            <textarea id="address" class="swal2-textarea" style="width: 100%;">${row.address || ''}</textarea>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Status</label>
            <select id="status" class="swal2-select" style="width: 100%;">
              <option value="Active" ${row.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${row.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3182ce',
      cancelButtonColor: '#e53e3e',
      preConfirm: () => {
        return {
          fullname: document.getElementById('fullname').value,
          email: document.getElementById('email').value,
          contact: document.getElementById('contact').value,
          address: document.getElementById('address').value,
          status: document.getElementById('status').value
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // In a real application, make API call to update employee
          // try {
          //   const response = await fetch(`${apiEndpoint}/${row.id}`, {
          //     method: 'PUT',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(result.value)
          //   });
          //   const updateResult = await response.json();
          //   
          //   if (!updateResult.success) {
          //     throw new Error(updateResult.message || 'Failed to update employee');
          //   }
          // } catch (apiError) {
          //   console.error('API Error during update:', apiError);
          //   // Continue with local update despite API error for demo purposes
          // }
          
          // Update local state
          const updatedUsers = users.map(user => {
            if (user.id === row.id) {
              return { ...user, ...result.value };
            }
            return user;
          });
          
          setUsers(updatedUsers);
          
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${result.value.fullname} has been updated successfully.`,
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error updating employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was a problem updating the employee.',
            confirmButtonColor: '#3182ce'
          });
        }
      }
    });
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${row.fullname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#3182ce',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // In a real application, make API call to delete employee
          // try {
          //   const response = await fetch(`${apiEndpoint}/${row.id}`, {
          //     method: 'DELETE'
          //   });
          //   const deleteResult = await response.json();
          //   
          //   if (!deleteResult.success) {
          //     throw new Error(deleteResult.message || 'Failed to delete employee');
          //   }
          // } catch (apiError) {
          //   console.error('API Error during delete:', apiError);
          //   // Continue with local deletion despite API error for demo purposes
          // }
          
          // Update local state
          const updatedUsers = users.filter(user => user.id !== row.id);
          setUsers(updatedUsers);
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${row.fullname} has been deleted.`,
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error deleting employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'There was a problem deleting the employee.',
            confirmButtonColor: '#3182ce'
          });
        }
      }
    });
  };

  const handleBlockToggle = (row) => {
    if (row.isBlocked) {
      // Handle unblocking
      Swal.fire({
        title: 'Unblock Employee',
        html: `
          <div style="text-align: left;">
            <p><strong>Name:</strong> ${row.fullname}</p>
            <p><strong>Current block reason:</strong> ${row.blockReason || 'No reason provided'}</p>
            <p>Are you sure you want to unblock this employee?</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Unblock',
        confirmButtonColor: '#38a169',
        cancelButtonColor: '#e53e3e'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // In a real application, make API call to unblock employee
            // try {
            //   const response = await fetch(`${apiEndpoint}/unblock/${row.id}`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     }
            //   });
            //   const unblockResult = await response.json();
            //   
            //   if (!unblockResult.success) {
            //     throw new Error(unblockResult.message || 'Failed to unblock employee');
            //   }
            // } catch (apiError) {
            //   console.error('API Error during unblock:', apiError);
            //   // Continue with local unblock despite API error for demo purposes
            // }
            
            // Update local state - only update the specific user that was unblocked
            const updatedUsers = users.map(user => {
              if (user.id === row.id) {
                return { 
                  ...user, 
                  isBlocked: false, 
                  blockReason: '',
                  blockedAt: null
                };
              }
              return user;
            });
            
            setUsers(updatedUsers);
            
            Swal.fire({
              icon: 'success',
              title: 'Unblocked!',
              text: `${row.fullname} has been unblocked successfully.`,
              timer: 1500,
              showConfirmButton: false
            });
          } catch (error) {
            console.error('Error unblocking employee:', error);
            Swal.fire({
              icon: 'error',
              title: 'Unblock Failed',
              text: 'There was a problem unblocking the employee.',
              confirmButtonColor: '#3182ce'
            });
          }
        }
      });
    } else {
      // Handle blocking
      Swal.fire({
        title: 'Block Employee',
        html: `
          <div style="text-align: left;">
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Status</label>
              <select id="block-status" class="swal2-select" style="width: 100%;">
                <option value="Active">Active</option>
                <option value="Inactive" selected>Inactive</option>
              </select>
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Block Reason</label>
              <textarea id="block-reason" class="swal2-textarea" placeholder="Enter reason for blocking..." style="width: 100%;"></textarea>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Block',
        confirmButtonColor: '#9c4221',
        cancelButtonColor: '#3182ce',
        preConfirm: () => {
          return {
            status: document.getElementById('block-status').value,
            blockReason: document.getElementById('block-reason').value
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const currentTime = new Date().toISOString();
            
            // In a real application, make API call to block employee
            const blockData = {
              userId: row.id,
              status: result.value.status,
              blockReason: result.value.blockReason,
              blockedAt: currentTime
            };
            
            // try {
            //   const response = await fetch(`${apiEndpoint}/block/${row.id}`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(blockData)
            //   });
            //   const blockResult = await response.json();
            //   
            //   if (!blockResult.success) {
            //     throw new Error(blockResult.message || 'Failed to block employee');
            //   }
            // } catch (apiError) {
            //   console.error('API Error during block:', apiError);
            //   // Continue with local block despite API error for demo purposes
            // }
            
            // Update local state - only update the specific user that was blocked
            const updatedUsers = users.map(user => {
              if (user.id === row.id) {
                return { 
                  ...user, 
                  isBlocked: true, 
                  status: result.value.status,
                  blockReason: result.value.blockReason,
                  blockedAt: currentTime
                };
              }
              return user;
            });
            
            setUsers(updatedUsers);
            
            // Store blocked users in localStorage for UserBlockList component
            const blockedUsers = updatedUsers.filter(user => user.isBlocked);
            localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
            
            Swal.fire({
              icon: 'success',
              title: 'Blocked!',
              text: `${row.fullname} has been blocked successfully.`,
              timer: 1500,
              showConfirmButton: false
            });
          } catch (error) {
            console.error('Error blocking employee:', error);
            Swal.fire({
              icon: 'error',
              title: 'Block Failed',
              text: 'There was a problem blocking the employee.',
              confirmButtonColor: '#3182ce'
            });
          }
        }
      });
    }
  };

  const handleAddUser = () => {
    Swal.fire({
      title: 'Add New Employee',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name</label>
            <input id="fullname" class="swal2-input" placeholder="Enter full name" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
            <input id="email" class="swal2-input" placeholder="Enter email address" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Contact</label>
            <input id="contact" class="swal2-input" placeholder="Enter contact number" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Password</label>
            <input id="password" type="password" class="swal2-input" placeholder="Enter password" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Address</label>
            <textarea id="address" class="swal2-textarea" placeholder="Enter address" style="width: 100%;"></textarea>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Status</label>
            <select id="status" class="swal2-select" style="width: 100%;">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add Employee',
      confirmButtonColor: '#38a169',
      cancelButtonColor: '#e53e3e',
      preConfirm: () => {
        return {
          fullname: document.getElementById('fullname').value,
          email: document.getElementById('email').value,
          contact: document.getElementById('contact').value,
          password: document.getElementById('password').value,
          address: document.getElementById('address').value,
          status: document.getElementById('status').value
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Validation
          const { fullname, email } = result.value;
          if (!fullname || !email) {
            throw new Error('Name and email are required');
          }
          
          // In a real application, make API call to add employee
          const newEmployee = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            fullname: result.value.fullname,
            email: result.value.email,
            contact: result.value.contact,
            password: result.value.password, // In a production app, this should be handled securely
            address: result.value.address,
            status: result.value.status,
            numberOfShifts: 0,
            isBlocked: false,
            blockReason: '',
            blockedAt: null
          };
          
          // try {
          //   const response = await fetch(apiEndpoint, {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(newEmployee)
          //   });
          //   const addResult = await response.json();
          //   
          //   if (!addResult.success) {
          //     throw new Error(addResult.message || 'Failed to add employee');
          //   }
          //   
          //   // Get the id from the API response
          //   newEmployee.id = addResult.data.id; 
          // } catch (apiError) {
          //   console.error('API Error during add:', apiError);
          //   // Continue with local add despite API error for demo purposes
          // }
          
          // Update local state
          setUsers([...users, newEmployee]);
          
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${newEmployee.fullname} has been added successfully.`,
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error adding employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'Add Failed',
            text: error.message || 'There was a problem adding the employee.',
            confirmButtonColor: '#3182ce'
          });
        }
      }
    });
  };

  const handleViewBlockedUsers = () => {
    // Get blocked users from state
    const blockedUsers = users.filter(user => user.isBlocked);
    
    if (blockedUsers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Blocked Users',
        text: 'There are currently no blocked users in the system.',
        confirmButtonColor: '#3182ce'
      });
      return;
    }
    
    // Format the blocked users for display
    const blockedUsersHtml = blockedUsers.map(user => {
      const blockedDate = user.blockedAt ? new Date(user.blockedAt).toLocaleDateString() : 'N/A';
      return `
        <div style="border-bottom: 1px solid #e2e8f0; padding: 12px 0; text-align: left;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${user.fullname}</h3>
          <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong> ${user.email}</p>
          <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Blocked since:</strong> ${blockedDate}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Reason:</strong> ${user.blockReason || 'No reason provided'}</p>
        </div>
      `;
    }).join('');
    
    Swal.fire({
      title: 'Blocked Users',
      width: 600,
      html: `
        <div style="max-height: 400px; overflow-y: auto; padding: 12px;">
          ${blockedUsersHtml}
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#3182ce'
    });
  };

  // Define columns for DataTable
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Full Name',
      selector: row => row.fullname,
      sortable: true,
      cell: row => <div style={{ fontWeight: '500' }}>{row.fullname}</div>,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <div>
          <span className={`badge ${row.isBlocked ? 'badge-blocked' : (row.status === 'Active' ? 'badge-active' : 'badge-inactive')}`}>
            {row.isBlocked ? 'Blocked' : row.status}
          </span>
        </div>
      ),
      width: '120px',
    },
    {
      name: 'Shifts',
      selector: row => row.numberOfShifts,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button onClick={() => handleView(row)} className="action-button view-button" title="View Details">
            <FaEye size={16} />
          </button>
          <button onClick={() => handleEdit(row)} className="action-button edit-button" title="Edit">
            <FaEdit size={16} />
          </button>
          <button onClick={() => handleDelete(row)} className="action-button delete-button" title="Delete">
            <FaTrash size={16} />
          </button>
          <button 
            onClick={() => handleBlockToggle(row)} 
            className={`action-button ${row.isBlocked ? 'unblock-button' : 'block-button'}`} 
            title={row.isBlocked ? 'Unblock User' : 'Block User'}
          >
            {row.isBlocked ? <FaUserCheck size={16} /> : <FaBan size={16} />}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px',
        fontSize: '14px',
        borderBottom: '1px solid #f1f5f9',
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f7fafc',
        minHeight: '56px',
        borderBottomWidth: '1px',
        borderBottomColor: '#e2e8f0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
      },
    },
    headCells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e2e8f0',
        fontSize: '13px',
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        cursor: 'pointer',
        transition: '0.2s',
        fill: '#3182ce',
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'unset',
          color: '#cbd5e0',
          fill: '#cbd5e0',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: '#edf2f7',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: '#e2e8f0',
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <style>{spinKeyframes}</style>
      
      <div style={styles.header}>
        <h1 style={styles.title}>Employee Management</h1>
        
        <div style={styles.buttonsContainer}>
          <CSVLink 
            data={filteredUsers} 
            filename="employee_data.csv"
            style={styles.exportButton}
            className="hover-effect"
          >
            <FaFileExport /> Export CSV
          </CSVLink>
          
          <button 
            style={styles.addButton}
            className="hover-effect"
            onClick={handleAddUser}
          >
            <FaUserPlus /> Add Employee
          </button>
          
          <button 
            style={styles.refreshButton}
            className="hover-effect"
            onClick={fetchEmployees}
          >
            <FaSync /> Refresh
          </button>
          
          <button 
            style={styles.blockedListButton}
            className="hover-effect"
            onClick={handleViewBlockedUsers}
          >
            <FaBan /> Blocked Users
          </button>
        </div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search employees..."
            style={styles.searchInput}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div style={styles.loadingMessage}>
            <div style={styles.spinner}></div>
            <span style={{ marginLeft: '12px' }}>Loading employee data...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={styles.noDataMessage}>
            No employees found matching your search criteria.
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            paginationPerPage={perPage}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            onChangeRowsPerPage={setPerPage}
            onChangePage={setCurrentPage}
            sortServer
            onSort={handleSort}
            customStyles={customStyles}
            highlightOnHover
            responsive
            striped
            persistTableHead
            noHeader
          />
        )}
        
        <div style={{ marginTop: '16px', textAlign: 'right' }}>
          <span style={styles.paginationInfo}>
            Showing {filteredUsers.length > 0 ? ((currentPage - 1) * perPage) + 1 : 0} to {Math.min(currentPage * perPage, filteredUsers.length)} of {filteredUsers.length} employees
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;