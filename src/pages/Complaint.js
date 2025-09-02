import React from 'react';
import ComplaintForm from '../components/ComplaintForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bgVideo from "../assets/Background.mp4";

const Complaint = () => (
  <>
    <Navbar />
      <div className="complaint-bg-wrapper">
      <video
        autoPlay
        loop
        muted
        className="complaint-bg-video">      
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
<<<<<<< HEAD
      <div className="complaint-bg-overlay"></div>
      
        <ComplaintForm />
      
      <Footer />
=======
      
      <ComplaintForm />
>>>>>>> 2cf6bf1cf138dbbe956d23ad1720eabd58a9e3a9
    </div>
     <Footer />
   
   
  </>
);

export default Complaint;