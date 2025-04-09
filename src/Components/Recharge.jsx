import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faMapMarkerAlt,
  faPhone,
  faWallet,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Recharge = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        // Fetch specific department data based on the ID
        const response = await axios.get(`http://localhost:8000/departments/${departmentId}`);
        
        if (response.data.status === 'success') {
          setDepartment(response.data.data);
        } else {
          throw new Error('Failed to fetch department data');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching department data:', err);
        setError('Failed to load department details. Please try again.');
        setLoading(false);
      }
    };

    if (departmentId) {
      fetchDepartmentData();
    }
  }, [departmentId]);

  // Loading component
  const LoadingState = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
      <p style={styles.loadingText}>Loading department details...</p>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
      <button 
        style={styles.retryButton} 
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );

  // Department details display
  const DepartmentDetails = () => (
    <div style={styles.departmentInfo}>
      <h3 style={styles.infoTitle}>
        <FontAwesomeIcon icon={faBuilding} style={styles.infoIcon} />
        Department Name: {department.name}
      </h3>
      <p style={styles.infoText}>
        <strong>Type:</strong> {department.category}
      </p>
      <p style={styles.infoText}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.infoIcon} />
        <strong>Address:</strong> {department.address}
      </p>
      <p style={styles.infoText}>
        <FontAwesomeIcon icon={faPhone} style={styles.infoIcon} />
        <strong>Contact:</strong> {department.contact || '+91 9876543210'}
      </p>
      <p style={styles.infoText}>
        <strong>Keywords:</strong> {department.keywords || `${department.category}, management, staff`}
      </p>
    </div>
  );

  // Financial info display
  const FinancialInfo = () => (
    <div style={styles.financialContainer}>
      <div style={styles.walletSection}>
        <h3 style={styles.sectionTitle}>
          <FontAwesomeIcon icon={faWallet} style={styles.sectionIcon} /> Wallet Balance
        </h3>
        <p style={styles.balanceText}>
          Current Balance: 
          <span style={styles.amountText}> ₹{department.walletBalance || 0}</span>
        </p>
      </div>

      <div style={styles.shiftsSection}>
        <h3 style={styles.sectionTitle}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.sectionIcon} /> Shifts Information
        </h3>
        <p style={styles.shiftsText}>
          Available Shifts: 
          <span style={styles.shiftsValue}> {department.availableShifts || 5} shifts</span>
        </p>
        <p style={styles.shiftsText}>
          Cost per Shift: 
          <span style={styles.shiftsValue}> ₹{department.costPerShift || 200}</span>
        </p>
        <p style={styles.shiftsText}>
          Total Cost: 
          <span style={styles.shiftsValue}> ₹{department.totalCost || (department.costPerShift * department.availableShifts) || 1000}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.rechargeCard}>
        <h2 style={styles.cardTitle}>Department Recharge</h2>
        
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : department ? (
          <>
            <DepartmentDetails />
            <FinancialInfo />
            <button style={styles.paymentButton}>
              Proceed to Payment
            </button>
          </>
        ) : (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>Department not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  rechargeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginTop: '20px'
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '25px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '15px'
  },
  departmentInfo: {
    marginBottom: '25px',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '15px'
  },
  infoText: {
    fontSize: '14px',
    color: '#4b5563',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center'
  },
  infoIcon: {
    color: '#4a6cf7',
    marginRight: '10px',
    width: '16px'
  },
  financialContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '25px'
  },
  walletSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px'
  },
  shiftsSection: {
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  sectionIcon: {
    color: '#4a6cf7',
    marginRight: '10px'
  },
  balanceText: {
    fontSize: '14px',
    color: '#4b5563',
    margin: '5px 0'
  },
  amountText: {
    fontWeight: '600',
    color: '#1f2937'
  },
  shiftsText: {
    fontSize: '14px',
    color: '#4b5563',
    margin: '8px 0'
  },
  shiftsValue: {
    fontWeight: '500',
    color: '#1f2937'
  },
  paymentButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    display: 'block'
  },
  // Loading state styles
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #4a6cf7',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    fontSize: '16px',
    color: '#6b7280'
  },
  // Error state styles
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  errorText: {
    fontSize: '16px',
    color: '#ef4444',
    marginBottom: '20px'
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default Recharge;