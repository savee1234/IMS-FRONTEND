import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './PageWrapper.css';

const PageWrapper = ({ children, showFooterBar = false, footerBarProps = {} }) => {
  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-main-content">
        {children}
        {!showFooterBar && <Footer />}
      </div>
      {showFooterBar && (
        <>
          <Footer />
          {/* FooterBar can be added here if needed */}
        </>
      )}
    </div>
  );
};

export default PageWrapper;

