import React from 'react';
import ComplaintForm from './complaint/ComplaintForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 

const Complaint = () => (
  <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
    

    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(248,250,252,0.3) 0%, rgba(226,232,240,0.3) 100%)',
      zIndex: -1,
    }}></div>
    
    <Navbar />
    
    <ComplaintForm />
    
    <Footer />
  </div>
);

export default Complaint;