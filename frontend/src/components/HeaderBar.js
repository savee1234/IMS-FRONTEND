import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const HeaderBar = ({ placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');

  const styles = {
    header: {
      height: '80px',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    searchContainer: {
      position: 'relative',
      width: '320px'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8'
    },
    searchInput: {
      width: '100%',
      padding: '10px 16px 10px 40px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      fontSize: '0.95rem',
      color: '#334155',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    headerActions: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    iconButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#64748b',
      position: 'relative',
      transition: 'all 0.2s'
    },
    notificationDot: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      border: '2px solid #ffffff'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.searchContainer}>
        <Search size={20} style={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.headerActions}>
        <button style={styles.iconButton}>
          <Bell size={20} />
          <span style={styles.notificationDot}></span>
        </button>
        <button style={styles.iconButton}>
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
