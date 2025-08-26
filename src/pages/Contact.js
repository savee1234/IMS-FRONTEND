import React from "react";
import Contactus from "../assets/contact.jpg";
import backgroundVideo from "../assets/Background.mp4";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: -1
      }}></div>

      <div
        className="leftSide"
        style={{ backgroundImage: `url(${Contactus})`, position: 'relative', zIndex: 1 }}
      ></div>
      <div className="rightSide" style={{ position: 'relative', zIndex: 1 }}>
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="sn">Service Number</label>
          <input name="sn" placeholder="Enter Service Number..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
