import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/AdminWishlistSystem.css';

const AdminWishlistSystem = () => {
  const [allDepartments, setAllDepartments] = useState([]);
  const [wishlistDepartments, setWishlistDepartments] = useState([]);
  const [buttonName, setButtonName] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [addToWishlist, setAddToWishlist] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showWishlistSection, setShowWishlistSection] = useState(false);

  const createButton = () => {
    if (!buttonName.trim() || !imageSource.trim()) {
      alert('Please enter button name and image source.');
      return;
    }

    const department = {
      name: buttonName.trim(),
      image: imageSource.trim(),
      wishlist: addToWishlist,
    };

    setAllDepartments([...allDepartments, department]);

    if (addToWishlist) {
      setWishlistDepartments([...wishlistDepartments, department]);
    }

    setButtonName('');
    setImageSource('');
    setAddToWishlist(false);
  };

  const filteredWishlist = wishlistDepartments.filter(dep =>
    dep.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Admin Panel - Create Department Buttons</h2>

      <div className="section">
        <input
          type="text"
          placeholder="Button Name (Department)"
          value={buttonName}
          onChange={(e) => setButtonName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image Source URL"
          value={imageSource}
          onChange={(e) => setImageSource(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={addToWishlist}
            onChange={(e) => setAddToWishlist(e.target.checked)}
          /> Add to Wishlist
        </label>
        <button onClick={createButton}>Create Button</button>
      </div>

      <div className="section">
        <h3>All Buttons</h3>
        <div className="button-list">
          {allDepartments.map((dep, index) => (
            <button key={index}>
              <img src={dep.image} alt="" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              {dep.name}
            </button>
          ))}
        </div>
      </div>

      <hr />

      <div className="section">
        <h3>Employee Dashboard</h3>
        <button onClick={() => setShowWishlistSection(!showWishlistSection)}>🎯 Wishlist</button>

        {showWishlistSection && (
          <div className="wishlist">
            <h4>Wishlist Departments</h4>
            <div className="filter-search">
              <input
                type="text"
                placeholder="Search Department"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="wishlist-buttons">
              {filteredWishlist.length > 0 ? (
                filteredWishlist.map((dep, index) => (
                  <button key={index}>
                    <img src={dep.image} alt="" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
                    {dep.name}
                  </button>
                ))
              ) : (
                'No departments found.'
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWishlistSystem;
