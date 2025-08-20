// src/pages/Complaint.js
import React from 'react';
import Navbar from '../components/Navbar'; // ✅ Import the Navbar
import ComplaintForm from '../components/ComplaintForm';
import backgroundVideo from '../assets/Background.mp4';

const Complaint = () => (
  <div>
    <Navbar /> {/* ✅ Add the Navbar here */}
    <div className="container" style={styles.container}> 
      <h1 style={styles.heading}>Submit a Complaint</h1>
      <ComplaintForm />
    </div>
  </div>

);


const styles = {
  container: {
    padding: '20px 40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    color: '#002b5b',
    marginBottom: '20px',
  },
};

export default Complaint;
