import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faCalendarPlus,
  faBuilding,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch departments
        const departmentsResponse = await axios.get('http://localhost:8000/departments');
        
        if (departmentsResponse.data.status === 'success') {
          const departmentsData = departmentsResponse.data.data.map(dept => ({
            id: dept._id,
            name: dept.name,
            category: dept.category,
            location: dept.address,
            image: dept.photo || '/api/placeholder/200/200',
          }));
          
          setDepartments(departmentsData);
          setFilteredDepartments(departmentsData);
        }
        
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:8000/categories-with-count');
        
        if (categoriesResponse.data.status === 'success') {
          const categoryNames = ['all', ...categoriesResponse.data.data.map(cat => cat.name)];
          setCategories(categoryNames);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter departments by category
  const filterCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, searchQuery);
  };

  // Filter departments by search query
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    applyFilters(activeCategory, query);
  };

  // Apply both category and search filters
  const applyFilters = (category, query) => {
    let filtered = departments;
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter((dept) => dept.category === category);
    }
    
    // Apply search filter
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filtered = filtered.filter((dept) =>
        dept.name.toLowerCase().includes(lowerCaseQuery) ||
        dept.category.toLowerCase().includes(lowerCaseQuery) ||
        dept.location.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredDepartments(filtered);
  };
  
  // Component for each department card
  const DepartmentCard = ({ department }) => (
    <div style={styles.departmentCard} data-category={department.category}>
      <div style={styles.cardImageContainer}>
        <img src={department.image} alt={department.name} style={styles.cardImage} />
        <div style={styles.categoryBadge}>{department.category}</div>
      </div>
      <div style={styles.departmentContent}>
        <h3 style={styles.departmentTitle}>{department.name}</h3>
        <p style={styles.departmentLocation}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.locationIcon} /> {department.location}
        </p>
        {/* Changed link from BookShift to Recharge */}
        <Link to={`/Recharge/${department.id}`} style={styles.linkStyle}>
          <button style={styles.bookButton}>
            <FontAwesomeIcon icon={faCalendarPlus} style={styles.buttonIcon} /> Book Shift
          </button>
        </Link>
      </div>
    </div>
  );

  // Loading component
  const LoadingState = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
      <p style={styles.loadingText}>Loading departments...</p>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
      <button 
        style={styles.resetButton} 
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <>
      {/* Department Section Header */}
      <div style={{...styles.sectionHeader, ...styles.departmentsHeader}}>
        <h2 style={styles.sectionTitle}>
          <FontAwesomeIcon icon={faBuilding} style={styles.sectionIcon} /> Available Departments
        </h2>
        <div style={styles.statsBadge}>
          {filteredDepartments.length} departments found
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search departments by name, category, or location..."
          onChange={handleSearch}
          value={searchQuery}
          disabled={loading || error}
        />
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...styles.filterButton,
              backgroundColor: activeCategory === category ? '#4a6cf7' : '#f3f4f6',
              color: activeCategory === category ? '#ffffff' : '#4b5563'
            }}
            onClick={() => filterCategory(category)}
            disabled={loading || error}
          >
            {category === 'all' ? 'All Departments' : category}
          </button>
        ))}
      </div>

      {/* Content States (Loading, Error, or Department Cards) */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : filteredDepartments.length > 0 ? (
        <div style={styles.departmentGrid}>
          {filteredDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <FontAwesomeIcon icon={faSearch} size="3x" style={styles.noResultsIcon} />
          <h3 style={styles.noResultsTitle}>No departments found</h3>
          <p style={styles.noResultsText}>No departments match your search criteria. Try adjusting your filters.</p>
          <button 
            style={styles.resetButton} 
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setFilteredDepartments(departments);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

// Internal CSS styles object
const styles = {
  // Section header
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  
  departmentsHeader: {
    marginTop: '30px'
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
  
  statsBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#e5e7eb',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#4b5563'
  },
  
  // Search
  searchContainer: {
    position: 'relative',
    marginBottom: '20px'
  },
  
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  
  searchInput: {
    width: '100%',
    padding: '14px 20px 14px 45px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    color: '#1f2937'
  },
  
  // Filter buttons
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px'
  },
  
  filterButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'capitalize'
  },
  
  // Department grid
  departmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  
  // Department card
  departmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  
  cardImageContainer: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden'
  },
  
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  
  categoryBadge: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500
  },
  
  departmentContent: {
    padding: '20px'
  },
  
  departmentTitle: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937'
  },
  
  departmentLocation: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 20px 0',
    fontSize: '14px',
    color: '#6b7280'
  },
  
  locationIcon: {
    marginRight: '8px',
    color: '#4a6cf7'
  },
  
  linkStyle: {
    textDecoration: 'none'
  },
  
  bookButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  },
  
  buttonIcon: {
    marginRight: '8px'
  },
  
  // No results
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  
  noResultsIcon: {
    color: '#d1d5db',
    marginBottom: '20px'
  },
  
  noResultsTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937',
    margin: '0 0 10px 0'
  },
  
  noResultsText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px 0'
  },
  
  resetButton: {
    padding: '10px 20px',
    backgroundColor: '#4a6cf7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  
  // Loading state
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
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
  
  // Error state
  errorContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  
  errorText: {
    fontSize: '16px',
    color: '#ef4444',
    marginBottom: '20px'
  },
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

export default Department;