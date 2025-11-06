import React, { useState, useEffect, useRef } from 'react';
import './ContactPersonSelect.css';

export default function ContactPersonSelect({ 
  contacts, 
  onSelect, 
  isLoading, 
  selectedPerson,
  placeholder = "Search by name or mobile number..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter contacts based on search term
    if (!search.trim()) {
      setFiltered(contacts || []);
      return;
    }

    const searchLower = search.toLowerCase();
    const filteredContacts = (contacts || []).filter(contact => 
      contact.name?.toLowerCase().includes(searchLower) ||
      contact.mobileNumber?.toLowerCase().includes(searchLower) ||
      contact.officeContactNumber?.toLowerCase().includes(searchLower)
    );
    setFiltered(filteredContacts);
  }, [search, contacts]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (contact) => {
    // Ensure we're passing a valid contact object
    if (contact && typeof contact === 'object') {
      onSelect(contact);
    }
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="contact-person-select" ref={dropdownRef}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={search || ''}
          onChange={(e) => {
            setSearch(e.target.value || '');
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="selected-contact">
          {selectedPerson && typeof selectedPerson === 'object' && selectedPerson.name ? (
            <span>
              {selectedPerson.name} ({selectedPerson.mobileNumber || 'No mobile'})
            </span>
          ) : null}
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {isLoading ? (
            <div className="dropdown-item loading">Loading contacts...</div>
          ) : !filtered || filtered.length === 0 ? (
            <div className="dropdown-item no-results">
              No contact person found for this search
            </div>
          ) : (
            (filtered || []).map(contact => (
              <div
                key={contact._id || contact.id || Math.random()}
                className="dropdown-item"
                onClick={() => handleSelect(contact)}
              >
                <div className="contact-name">{contact.name || 'Unnamed'}</div>
                <div className="contact-details">
                  {contact.mobileNumber && <span>{contact.mobileNumber}</span>}
                  {contact.organization && typeof contact.organization === 'string' && <span>{contact.organization}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}