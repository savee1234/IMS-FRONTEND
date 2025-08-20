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
   
     
    <div className="container">
      
      <ComplaintForm />
    </div>
     <Footer />
    </div>
   
  </>
);

export default Complaint;