import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartLine,
  faGlobe,
  faUsers,
  faBuilding,
  faWallet,
  faCog,
  faSignOutAlt,
  faQuestionCircle,
  faSearch,
  faBell,
  faEnvelope,
  faCreditCard,
  faHeart,
  faMoneyBillWave,
  faComments,
  faFileInvoice,
  faUserTie,
  faMoneyCheckAlt,
  faChartBar,
  faCalendarAlt,
  faDownload,
  faUpload,
  faChevronDown,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {!isCollapsed && (
        <>
          <div className="profile-section">
            <div className="profile-pic">A</div>
            <div className="profile-info">
              <div className="profile-name">Admin User</div>
              <div className="profile-role">
                <span className="profile-status"></span>Online
              </div>
            </div>
          </div>

          <div className="sidebar-header">
            <div className="logo">A</div>
            <h2>Admin Panel</h2>
          </div>
        </>
      )}

      <div className="toggle-sidebar" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className="nav-item">
        <button
          className={`dropdown ${dashboardOpen ? 'active' : ''}`}
          onClick={() => toggleDropdown(setDashboardOpen)}
        >
          <FontAwesomeIcon icon={faHome} />
          {!isCollapsed && <span>Dashboard</span>}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />}
        </button>
        {!isCollapsed && (
          <div className={`dropdown-content ${dashboardOpen ? 'show' : ''}`}>
            <a href="#">
              <FontAwesomeIcon icon={faChartLine} /> Analytics
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faGlobe} /> Overview
            </a>
          </div>
        )}
      </div>

      <div className="nav-item">
        <button
          className={`dropdown ${userOpen ? 'active' : ''}`}
          onClick={() => toggleDropdown(setUserOpen)}
        >
          <FontAwesomeIcon icon={faUsers} />
          {!isCollapsed && <span>Users</span>}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />}
        </button>
        {!isCollapsed && (
          <div className={`dropdown-content ${userOpen ? 'show' : ''}`}>
            <Link to={"UserDetails"}>User Details</Link>
            <Link to={"CreateUser"}>Create User</Link>
            
            <a href="Admin Tags/User-Block.html">User Block</a>
          </div>
        )}
      </div>

      <div className="nav-item">
        <button
          className={`dropdown ${deptOpen ? 'active' : ''}`}
          onClick={() => toggleDropdown(setDeptOpen)}
        >
          <FontAwesomeIcon icon={faBuilding} />
          {!isCollapsed && <span>Departments</span>}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />}
        </button>
        {!isCollapsed && (
          <div className={`dropdown-content ${deptOpen ? 'show' : ''}`}>
            <Link to={"DepartmentCategory"}>Create Category</Link>
            <Link to={"CreateDepartment"}>Create Department</Link>
       
    
            <a href="Admin Tags/Complain-department.html">Complain Department</a>
            <a href="Admin Tags/Department-details.html">Department Details</a>
            <a href="Admin Tags/Department-Block.html">Block Department</a>
          </div>
        )}
      </div>

      <div className="nav-item">
        <button
          className={`dropdown ${financeOpen ? 'active' : ''}`}
          onClick={() => toggleDropdown(setFinanceOpen)}
        >
          <FontAwesomeIcon icon={faWallet} />
          {!isCollapsed && <span>Finance</span>}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />}
        </button>
        {!isCollapsed && (
          <div className={`dropdown-content ${financeOpen ? 'show' : ''}`}>
            <a href="Admin Tags/Payment-Details.html">Payment Manager</a>
            <a href="Admin Tags/Recharge-manager.html">Recharge Manager</a>
            <a href="#">Expense Tracking</a>
            <a href="#">Generate Invoices</a>
          </div>
        )}
      </div>

      <div className="nav-item">
        <button
          className={`dropdown ${settingsOpen ? 'active' : ''}`}
          onClick={() => toggleDropdown(setSettingsOpen)}
        >
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Settings</span>}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />}
        </button>
        {!isCollapsed && (
          <div className={`dropdown-content ${settingsOpen ? 'show' : ''}`}>
            <a href="#">Account Settings</a>
            <a href="#">Security Settings</a>
            <a href="#">Dashboard Settings</a>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <a href="#">
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faQuestionCircle} /> <span>Help</span>
          </a>
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({ to, icon, title, value }) => (
  <a href={to} className="dashboard-card">
    <div className="card-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="card-title">{title}</div>
    <div className="card-value">{value}</div>
  </a>
);

const MainContent = () => (
  <div className="main">
    <div className="header">
      <h1>Admin Dashboard</h1>
      <div className="header-actions">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search..." />
        </div>
        <Link to={"NotificationAdmin"}>
        <button>
          <FontAwesomeIcon icon={faBell} />
        </button>
        </Link>
        <button>
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </div>
    </div>

    <div className="dashboard">
      <DashboardCard
        to="Admin Tags/Recharge-manager.html"
        icon={faCreditCard}
        title="Recharge Manager"
        value="24 Transactions"
      />
      <DashboardCard
        to="Admin Tags/Wishlist.html"
        icon={faHeart}
        title="Wishlist"
        value="142 Items"
      />
      <DashboardCard
        to="Admin Tags/Payment-Details.html"
        icon={faMoneyBillWave}
        title="Payment Manager"
        value="18 Pending"
      />
      <DashboardCard
        to="#"
        icon={faComments}
        title="User Feedback"
        value="7 New"
      />
      <DashboardCard
        to="#"
        icon={faChartLine}
        title="Expense Tracking"
        value="Monthly Report"
      />
      <DashboardCard
        to="#"
        icon={faFileInvoice}
        title="Generate Invoices"
        value="12 Ready"
      />
      <DashboardCard
        to="#"
        icon={faUserTie}
        title="Employee Status"
        value="32 Active"
      />
      <DashboardCard
        to="#"
        icon={faMoneyCheckAlt}
        title="Payroll Management"
        value="Next: Apr 15"
      />
      <DashboardCard
        to="#"
        icon={faChartBar}
        title="Performance Review"
        value="5 Upcoming"
      />
      <DashboardCard
        to="#"
        icon={faCalendarAlt}
        title="Meeting Scheduler"
        value="3 Today"
      />
      <DashboardCard
        to="#"
        icon={faDownload}
        title="Export Data"
        value="CSV, Excel"
      />
      <DashboardCard
        to="#"
        icon={faUpload}
        title="Import Data"
        value="Bulk Upload"
      />
    </div>
  </div>
);

function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const styles = {
    // Admin Layout
    adminLayout: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f7fafc'
    },
    
    // Sidebar Styles
    sidebar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      width: '280px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      transition: 'width 0.3s ease',
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRight: '1px solid #e2e8f0'
    },
    
    sidebarCollapsed: {
      width: '80px'
    },
    
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #e2e8f0'
    },
    
    profilePic: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#4361ee',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      marginRight: '12px'
    },
    
    profileInfo: {
      flex: 1
    },
    
    profileName: {
      fontWeight: 600,
      fontSize: '16px',
      color: '#2d3748',
      marginBottom: '4px'
    },
    
    profileRole: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: '#718096'
    },
    
    profileStatus: {
      width: '8px',
      height: '8px',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      marginRight: '6px',
      display: 'inline-block'
    },
    
    sidebarHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #e2e8f0'
    },
    
    logo: {
      width: '40px',
      height: '40px',
      backgroundColor: '#4361ee',
      color: '#ffffff',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      marginRight: '12px'
    },
    
    sidebarHeaderTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      color: '#2d3748'
    },
    
    toggleSidebar: {
      padding: '12px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4361ee',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10px auto'
    },
    
    navItem: {
      margin: '5px 0'
    },
    
    dropdownButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 20px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#718096',
      fontSize: '14px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative'
    },
    
    dropdownButtonActive: {
      backgroundColor: '#eef2ff',
      color: '#4361ee',
      borderLeft: '4px solid #4361ee'
    },
    
    dropdownIcon: {
      marginRight: '12px',
      width: '20px',
      textAlign: 'center'
    },
    
    dropdownArrow: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'transform 0.2s ease'
    },
    
    dropdownArrowActive: {
      transform: 'translateY(-50%) rotate(180deg)'
    },
    
    dropdownContent: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
      backgroundColor: '#f8fafc',
      paddingLeft: '20px'
    },
    
    dropdownContentShow: {
      maxHeight: '300px'
    },
    
    dropdownLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      color: '#718096',
      textDecoration: 'none',
      fontSize: '13px',
      transition: 'color 0.2s ease'
    },
    
    dropdownLinkHover: {
      color: '#4361ee'
    },
    
    sidebarFooter: {
      borderTop: '1px solid #e2e8f0',
      padding: '15px 20px',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around'
    },
    
    footerLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#718096',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.2s ease'
    },
    
    footerLinkHover: {
      color: '#4361ee'
    },
    
    footerIcon: {
      marginRight: '8px'
    },
    
    // Main Content
    main: {
      flex: 1,
      marginLeft: '280px',
      padding: '20px',
      transition: 'margin-left 0.3s ease'
    },
    
    mainCollapsed: {
      marginLeft: '80px'
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    
    headerTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 700,
      color: '#2d3748'
    },
    
    headerActions: {
      display: 'flex',
      alignItems: 'center'
    },
    
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      padding: '8px 16px',
      marginRight: '16px'
    },
    
    searchIcon: {
      color: '#718096',
      marginRight: '8px'
    },
    
    searchInput: {
      border: 'none',
      backgroundColor: 'transparent',
      outline: 'none',
      fontSize: '14px',
      color: '#2d3748',
      width: '160px'
    },
    
    actionButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f7fafc',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#718096',
      fontSize: '16px',
      cursor: 'pointer',
      marginLeft: '12px',
      transition: 'background-color 0.2s ease'
    },
    
    actionButtonHover: {
      backgroundColor: '#edf2f7',
      color: '#4361ee'
    },
    
    // Dashboard Cards
    dashboard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    },
    
    dashboardCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '25px 20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      textDecoration: 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    
    dashboardCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    
    cardIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      backgroundColor: '#eef2ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: '#4361ee',
      marginBottom: '15px'
    },
    
    cardTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#2d3748',
      marginBottom: '8px',
      textAlign: 'center'
    },
    
    cardValue: {
      fontSize: '14px',
      color: '#718096',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.adminLayout} className="admin-layout">
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f7fafc;
            color: #2d3748;
            font-size: 14px;
            line-height: 1.5;
          }
          
          .admin-layout {
            display: flex;
            min-height: 100vh;
          }
          
          .sidebar {
            background-color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            width: 280px;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            transition: width 0.3s ease;
            overflow-y: auto;
            overflow-x: hidden;
            border-right: 1px solid #e2e8f0;
          }
          
          .sidebar.collapsed {
            width: 80px;
          }
          
          .profile-section {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #4361ee;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            margin-right: 12px;
          }
          
          .profile-info {
            flex: 1;
          }
          
          .profile-name {
            font-weight: 600;
            font-size: 16px;
            color: #2d3748;
            margin-bottom: 4px;
          }
          
          .profile-role {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #718096;
          }
          
          .profile-status {
            width: 8px;
            height: 8px;
            background-color: #10b981;
            border-radius: 50%;
            margin-right: 6px;
            display: inline-block;
          }
          
          .sidebar-header {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .logo {
            width: 40px;
            height: 40px;
            background-color: #4361ee;
            color: #ffffff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            margin-right: 12px;
          }
          
          .sidebar-header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #2d3748;
          }
          
          .toggle-sidebar {
            padding: 12px;
            background-color: transparent;
            border: none;
            color: #4361ee;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px auto;
          }
          
          .nav-item {
            margin: 5px 0;
          }
          
          .dropdown {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 12px 20px;
            border: none;
            background-color: transparent;
            color: #718096;
            font-size: 14px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
          }
          
          .dropdown.active {
            background-color: #eef2ff;
            color: #4361ee;
            border-left: 4px solid #4361ee;
          }
          
          .dropdown svg:first-child {
            margin-right: 12px;
            width: 20px;
            text-align: center;
          }
          
          .dropdown .dropdown-arrow {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            transition: transform 0.2s ease;
          }
          
          .dropdown.active .dropdown-arrow {
            transform: translateY(-50%) rotate(180deg);
          }
          
          .dropdown-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            background-color: #f8fafc;
            padding-left: 20px;
          }
          
          .dropdown-content.show {
            max-height: 300px;
          }
          
          .dropdown-content a {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            color: #718096;
            text-decoration: none;
            font-size: 13px;
            transition: color 0.2s ease;
          }
          
          .dropdown-content a:hover {
            color: #4361ee;
          }
          
          .sidebar-footer {
            border-top: 1px solid #e2e8f0;
            padding: 15px 20px;
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
          }
          
          .sidebar-footer a {
            display: flex;
            align-items: center;
            color: #718096;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s ease;
          }
          
          .sidebar-footer a:hover {
            color: #4361ee;
          }
          
          .sidebar-footer a svg {
            margin-right: 8px;
          }
          
          .main {
            flex: 1;
            margin-left: 280px;
            padding: 20px;
            transition: margin-left 0.3s ease;
          }
          
          .sidebar.collapsed + .main {
            margin-left: 80px;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #2d3748;
          }
          
          .header-actions {
            display: flex;
            align-items: center;
          }
          
          .search-bar {
            display: flex;
            align-items: center;
            background-color: #f7fafc;
            border-radius: 8px;
            padding: 8px 16px;
            margin-right: 16px;
          }
          
          .search-bar svg {
            color: #718096;
            margin-right: 8px;
          }
          
          .search-bar input {
            border: none;
            background-color: transparent;
            outline: none;
            font-size: 14px;
            color: #2d3748;
            width: 160px;
          }
          
          .header-actions button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f7fafc;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #718096;
            font-size: 16px;
            cursor: pointer;
            margin-left: 12px;
            transition: background-color 0.2s ease;
          }
          
          .header-actions button:hover {
            background-color: #edf2f7;
            color: #4361ee;
          }
          
          .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .dashboard-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 25px 20px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .card-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background-color: #eef2ff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            color: #4361ee;
            margin-bottom: 15px;
          }
          
          .card-title {
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 8px;
            text-align: center;
          }
          
          .card-value {
            font-size: 14px;
            color: #718096;
            text-align: center;
          }
          
          @media (max-width: 768px) {
            .sidebar {
              width: 80px;
            }
            
            .sidebar:not(.collapsed) {
              width: 280px;
              transform: translateX(0);
            }
            
            .sidebar.collapsed {
              transform: translateX(-100%);
            }
            
            .main {
              margin-left: 80px;
            }
            
            .sidebar:not(.collapsed) + .main {
              margin-left: 280px;
            }
            
            .dashboard {
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
          }
          
          @media (max-width: 576px) {
            .main {
              margin-left: 0;
              padding: 15px;
            }
            
            .header {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .header-actions {
              margin-top: 15px;
              width: 100%;
              justify-content: space-between;
            }
            
            .search-bar {
              flex: 1;
              margin-right: 10px;
            }
            
            .dashboard {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <MainContent />
    </div>
  );
}

export default AdminDashboard;