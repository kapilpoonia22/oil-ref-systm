import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUserCircle,
  faUser,
  faTachometerAlt,
  faSignInAlt,
  faCalendarAlt,
  faHistory,
  faCog,
  faSignOutAlt,
  faChevronRight,
  faBriefcase,
  faBuilding,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Department from './Department'; // Import the Department component

// Sample data for booked shifts
const bookedShiftsData = [
  {
    id: 1,
    department: 'General Medicine',
    date: '05 Apr 2025',
    time: '09:00 - 17:00',
    status: 'Approved',
  },
  {
    id: 2,
    department: 'Emergency Unit',
    date: '08 Apr 2025',
    time: '18:00 - 02:00',
    status: 'Pending',
  },
  {
    id: 3,
    department: 'Oil Refining Plant',
    date: '12 Apr 2025',
    time: '10:00 - 18:00',
    status: 'Pending',
  },
];

function DepartmentList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // User data (would typically come from context or redux in a real app)
  const userData = {
    walletBalance: 4500,
    totalShifts: 12,
    completedShifts: 8,
    upcomingShifts: 3,
    userName: 'John Doe',
    staffId: '#12345',
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && event.target.id === 'overlay') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.sidebarTitle}>Menu</h3>
          <button style={styles.closeSidebarButton} onClick={closeSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div style={styles.userProfile}>
          <div style={styles.avatar}>
            <FontAwesomeIcon icon={faUserCircle} size="3x" style={styles.avatarIcon} />
          </div>
          <div style={styles.userInfo}>
            <h4 style={styles.userName}>{userData.userName}</h4>
            <p style={styles.staffId}>Staff ID: {userData.staffId}</p>
          </div>
        </div>
        
        <ul style={styles.sidebarLinks}>
          <li style={styles.sidebarItem}>
            <Link to="/Dashboard" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faTachometerAlt} style={styles.sidebarIcon} /> Dashboard
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/DepartmentLogin" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faBuilding} style={styles.sidebarIcon} /> Login as Department
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/EmployeeLogin" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faSignInAlt} style={styles.sidebarIcon} /> Login as Employee
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/Booked-shifts" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faCalendarAlt} style={styles.sidebarIcon} /> My Shifts
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/worked-history" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faHistory} style={styles.sidebarIcon} /> Booking History
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/Portfolio" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faUserCircle} style={styles.sidebarIcon} /> My Portfolio
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/Wallet" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faWallet} style={styles.sidebarIcon} /> My Wallet
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/Settings" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faCog} style={styles.sidebarIcon} /> Settings
            </Link>
          </li>
          <li style={{...styles.sidebarItem, ...styles.logoutItem}}>
            <Link to="/Logout" style={styles.sidebarLink}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.sidebarIcon} /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Toggle Button (visible on small screens) */}
      <button 
        style={{...styles.mobileMenuToggle, display: sidebarOpen ? 'none' : 'flex'}} 
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Overlay */}
      <div 
        id="overlay"
        style={{
          ...styles.overlay,
          opacity: sidebarOpen ? '0.5' : '0',
          visibility: sidebarOpen ? 'visible' : 'hidden'
        }} 
      />

      {/* Main Content Container */}
      <div style={{
        ...styles.contentContainer,
        marginLeft: sidebarOpen ? '280px' : '0',
      }}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Department Dashboard</h1>
          <div style={styles.headerRight}>
            <div style={styles.walletBalance}>
              <FontAwesomeIcon icon={faWallet} style={styles.walletIcon} /> ₹{userData.walletBalance}
            </div>
            <button style={styles.profileButton} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserCircle} style={styles.buttonIcon} /> Profile
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.mainContent}>
          {/* Personal Portfolio Section */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <FontAwesomeIcon icon={faBriefcase} style={styles.sectionIcon} /> My Personal Portfolio
              </h2>
              <Link to="/Portfolio" style={styles.viewAllLink}>
                View Details <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>

            <div style={styles.portfolioStats}>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{userData.totalShifts}</div>
                <div style={styles.statLabel}>Total Shifts</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{userData.completedShifts}</div>
                <div style={styles.statLabel}>Completed</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{userData.upcomingShifts}</div>
                <div style={styles.statLabel}>Upcoming</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>₹{userData.walletBalance}</div>
                <div style={styles.statLabel}>Wallet Balance</div>
              </div>
            </div>
          </section>

          {/* Booked Shifts Section */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <FontAwesomeIcon icon={faCalendarAlt} style={styles.sectionIcon} /> My Booked Shifts
              </h2>
              <Link to="/Booked-shifts" style={styles.viewAllLink}>
                View All <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.shiftTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Time</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookedShiftsData.map((shift) => (
                    <tr key={shift.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{shift.department}</td>
                      <td style={styles.tableCell}>{shift.date}</td>
                      <td style={styles.tableCell}>{shift.time}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: shift.status === 'Approved' ? '#10b981' : '#f59e0b',
                          color: shift.status === 'Approved' ? '#ffffff' : '#ffffff'
                        }}>
                          {shift.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Department Section - Using the Department Component */}
          <Department />
          
        </main>
      </div>
    </div>
  );
}

// Internal CSS styles object
const styles = {
  // Main container
  mainContainer: {
    display: 'flex',
    fontFamily: "'Poppins', sans-serif", 
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: '#f5f7fa'
  },
  
  // Content container
  contentContainer: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    width: '100%'
  },
  
  // Sidebar styles
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#111827',
    color: '#fff',
    zIndex: 1000,
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #2d3748'
  },
  
  sidebarTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff'
  },
  
  closeSidebarButton: {
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  },
  
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #2d3748'
  },
  
  avatar: {
    marginRight: '15px',
    color: '#4a6cf7'
  },
  
  avatarIcon: {
    color: '#4a6cf7'
  },
  
  userInfo: {
    flex: 1
  },
  
  userName: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff'
  },
  
  staffId: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#a0aec0'
  },
  
  sidebarLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  
  sidebarItem: {
    margin: 0,
    padding: 0
  },
  
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    color: '#cbd5e0',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    borderLeft: '4px solid transparent'
  },
  
  sidebarIcon: {
    width: '20px',
    marginRight: '15px',
    fontSize: '16px'
  },
  
  logoutItem: {
    marginTop: '20px',
    borderTop: '1px solid #2d3748',
    paddingTop: '10px'
  },
  
  // Mobile menu toggle
  mobileMenuToggle: {
    position: 'fixed',
    top: '15px',
    left: '15px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    zIndex: 999,
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  
  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    zIndex: 999,
    transition: 'opacity 0.3s ease, visibility 0.3s ease'
  },
  
  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  
  headerTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    color: '#1f2937',
    marginLeft:"2vw"
  },
  
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },
  
  walletBalance: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    color: '#1f2937',
    marginRight: '20px'
  },
  
  walletIcon: {
    marginRight: '8px',
    color: '#4a6cf7'
  },
  
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  
  buttonIcon: {
    marginRight: '8px'
  },
  
  // Main content
  mainContent: {
    padding: '20px 30px'
  },
  
  section: {
    marginBottom: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center'
  },
  
  sectionIcon: {
    marginRight: '10px',
    color: '#4a6cf7'
  },
  
  viewAllLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 500,
    color: '#4a6cf7',
    textDecoration: 'none'
  },
  
  // Portfolio stats
  portfolioStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px'
  },
  
  statCard: {
    backgroundColor: 'rgba(74, 108, 247, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'default'
  },
  
  statValue: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#4a6cf7',
    marginBottom: '8px'
  },
  
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500
  },
  
  // Shift table
  tableContainer: {
    overflowX: 'auto'
  },
  
  shiftTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  
  tableHeader: {
    padding: '12px 20px',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    color: '#4b5563',
    fontWeight: 600
  },
  
  tableRow: {
    transition: 'background-color 0.2s ease'
  },
  
  tableCell: {
    padding: '12px 20px',
    borderBottom: '1px solid #e5e7eb',
    color: '#1f2937'
  },
  
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 500,
    fontSize: '12px',
    textAlign: 'center'
  }
};

export default DepartmentList;