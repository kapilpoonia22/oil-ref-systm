import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, type: "KYC", message: "Your KYC verification is pending." },
  { id: 2, type: "System", message: "System maintenance scheduled for tonight." },
  { id: 3, type: "Employee", message: "New shift assigned to you." },
  { id: 4, type: "Department", message: "Meeting scheduled at 3 PM." },
];

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Styles
  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
    },
    button: {
      background: "none",
      border: "none",
      cursor: "pointer",
      position: "relative",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    count: {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      background: "red",
      color: "white",
      borderRadius: "50%",
      padding: "2px 6px",
      fontSize: "10px",
      fontWeight: "bold",
    },
    dropdown: {
      position: "absolute",
      top: "40px",
      left: "10px",
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "250px",
      zIndex: 1000,
      maxHeight: "300px",
      overflowY: "auto",
      transition: "all 0.3s ease",
    },
    item: {
      padding: "10px",
      borderBottom: "1px solid #eee",
      fontSize: "14px",
      color: "#333",
      display: "flex",
      flexDirection: "column",
    },
    empty: {
      padding: "15px",
      textAlign: "center",
      color: "#888",
    },
    // Responsive
    '@media (maxWidth: 600px)': {
      dropdown: {
        width: "200px",
      },
    },
  };

  // Dynamic type-based style
  const getTypeStyle = (type) => {
    switch (type) {
      case "KYC":
        return { color: "#FF5722" };
      case "System":
        return { color: "#3F51B5" };
      case "Employee":
        return { color: "#4CAF50" };
      case "Department":
        return { color: "#9C27B0" };
      default:
        return {};
    }
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <button style={styles.button} onClick={() => setOpen(!open)}>
        <Bell size={24} />
        {notifications.length > 0 && (
          <span style={styles.count}>{notifications.length}</span>
        )}
      </button>

      {open && (
        <div style={styles.dropdown}>
          {notifications.length === 0 ? (
            <div style={styles.empty}>No new notifications.</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{ ...styles.item, ...getTypeStyle(notification.type) }}
              >
                <strong>{notification.type}:</strong> {notification.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;