import React from 'react';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundVideo from '../assets/Background.mp4';

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
  videoBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -2,
  },
  gradientOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(245,245,245,0.3) 100%)',
    zIndex: -1,
  },
};

const MyTasks = () => {
  // table styles adapted to match configuration tables (e.g., Shifts)
  const tableStyles = {
    section: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
      border: '1px solid #eef2f7',
      marginBottom: '64px'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: '20px',
      textAlign: 'left'
    },
    title: {
      margin: 0,
      fontSize: '22px',
      fontWeight: 500,
      color: '#000',
      textAlign: 'left'
    },
    titleRule: {
      width: '100%',
      height: '2px',
      background: '#3b82f6',
      borderRadius: '1px',
      marginTop: '6px'
    },
    tableWrap: { width: '100%', overflowX: 'auto' },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px',
      backgroundColor: '#fff',
      border: '1px solid #e3e8ef'
    },
    th: {
      backgroundColor: '#1a237e',
      color: '#ffffff',
      fontWeight: 600,
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #e3e8ef',
      borderRight: '1px solid #e3e8ef',
      whiteSpace: 'nowrap'
    },
    thCenter: { textAlign: 'center' },
    tr: { borderBottom: '1px solid #e3e8ef' },
    td: {
      padding: '12px 15px',
      color: '#333',
      verticalAlign: 'middle',
      borderRight: '1px solid #e3e8ef'
    },
    tdCenter: { textAlign: 'center' },
    actionsCell: { textAlign: 'center' },
    actionIcons: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: '4px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    viewBtn: { backgroundColor: '#10b981' },
    editBtn: { backgroundColor: '#FFB300' },
    deleteBtn: { backgroundColor: '#F44336' }
  };

  return (
    <div style={styles.page}>
          <video autoPlay loop muted style={styles.videoBackground}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={styles.gradientOverlay}></div>
      <Navbar />
      <main style={{
        flex: 1,
        padding: '24px'
      }}>
        {/* White container with header and 3 tables */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Page Topic Header (configuration/attendance card style) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 0',
            marginBottom: '28px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
              border: '1px solid #e5e7eb',
              padding: '14px 24px',
              width: '100%'
            }}>
              <h1 style={{
                margin: 0,
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#111827'
              }}>
                View Task
              </h1>
              <p style={{
                margin: '8px 0 0 0',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.95rem'
              }}>
                Review and manage your tasks
              </p>
            </div>
          </div>
          {/* Outer white area containing all three tables */}
          <div style={{ background: 'transparent', borderRadius: '10px', padding: '0px', boxShadow: 'none', border: 'none' }}>
            {/* Complaints Table */}
            <section style={tableStyles.section}>
              <div style={tableStyles.header}>
                <h3 style={{ ...tableStyles.title, textAlign: 'center' }}>Complaints</h3>
                <div style={tableStyles.titleRule} />
              </div>
              <div style={tableStyles.tableWrap}>
                <table style={tableStyles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...tableStyles.th }}>Reference</th>
                      <th style={{ ...tableStyles.th }}>Category</th>
                      <th style={{ ...tableStyles.th }}>Organization</th>
                      <th style={{ ...tableStyles.th }}>Solution</th>
                      <th style={{ ...tableStyles.th }}>Medium</th>
                      <th style={{ ...tableStyles.th }}>Medium Source</th>
                      <th style={{ ...tableStyles.th, ...tableStyles.thCenter }}>Created</th>
                      <th style={{ ...tableStyles.th, ...tableStyles.thCenter }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableStyles.tr}>
                      <td style={tableStyles.td}>REQ-0001</td>
                      <td style={tableStyles.td}>Connectivity</td>
                      <td style={tableStyles.td}>SLT</td>
                      <td style={tableStyles.td}>Pending</td>
                      <td style={tableStyles.td}>Hotline</td>
                      <td style={tableStyles.td}>Customer</td>
                      <td style={{ ...tableStyles.td, ...tableStyles.tdCenter }}>2025-06-01</td>
                      <td style={{ ...tableStyles.td, ...tableStyles.actionsCell }}>
                        <div style={tableStyles.actionIcons}>
                          <button title="View" style={{ ...tableStyles.iconButton, ...tableStyles.viewBtn }}>
                            <FaEye size={14} />
                          </button>
                          <button title="Update" style={{ ...tableStyles.iconButton, ...tableStyles.editBtn }}>
                            <FaEdit size={14} />
                          </button>
                          <button title="Delete" style={{ ...tableStyles.iconButton, ...tableStyles.deleteBtn }}>
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contact Persons Table */}
            <section style={tableStyles.section}>
              <div style={tableStyles.header}>
                <h3 style={{ ...tableStyles.title, textAlign: 'center' }}>Contact Persons</h3>
                <div style={tableStyles.titleRule} />
              </div>
              <div style={tableStyles.tableWrap}>
                <table style={tableStyles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...tableStyles.th }}>Name</th>
                      <th style={{ ...tableStyles.th }}>Title</th>
                      <th style={{ ...tableStyles.th }}>Email</th>
                      <th style={{ ...tableStyles.th }}>Mobile</th>
                      <th style={{ ...tableStyles.th }}>Office Mobile</th>
                      <th style={{ ...tableStyles.th, ...tableStyles.thCenter }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableStyles.tr}>
                      <td style={tableStyles.td}>Auto Found Person</td>
                      <td style={tableStyles.td}>Mr.</td>
                      <td style={tableStyles.td}>found.person@slt.lk</td>
                      <td style={tableStyles.td}>0712345678</td>
                      <td style={tableStyles.td}>0112345678</td>
                      <td style={{ ...tableStyles.td, ...tableStyles.actionsCell }}>
                        <div style={tableStyles.actionIcons}>
                          <button title="View" style={{ ...tableStyles.iconButton, ...tableStyles.viewBtn }}>
                            <FaEye size={14} />
                          </button>
                          <button title="Update" style={{ ...tableStyles.iconButton, ...tableStyles.editBtn }}>
                            <FaEdit size={14} />
                          </button>
                          <button title="Delete" style={{ ...tableStyles.iconButton, ...tableStyles.deleteBtn }}>
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Assignments Table */}
            <section style={tableStyles.section}>
              <div style={tableStyles.header}>
                <h3 style={{ ...tableStyles.title, textAlign: 'center' }}>Assignments</h3>
                <div style={tableStyles.titleRule} />
              </div>
              <div style={tableStyles.tableWrap}>
                <table style={tableStyles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...tableStyles.th }}>Emp No</th>
                      <th style={{ ...tableStyles.th }}>Name</th>
                      <th style={{ ...tableStyles.th }}>Designation</th>
                      <th style={{ ...tableStyles.th }}>Availability</th>
                      <th style={{ ...tableStyles.th }}>Main Assignment</th>
                      <th style={{ ...tableStyles.th }}>Sub Assignment</th>
                      <th style={{ ...tableStyles.th }}>Doc Ref</th>
                      <th style={{ ...tableStyles.th }}>Doc Subject</th>
                      <th style={{ ...tableStyles.th, ...tableStyles.thCenter }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={tableStyles.tr}>
                      <td style={tableStyles.td}>E001</td>
                      <td style={tableStyles.td}>Kumara Perera</td>
                      <td style={tableStyles.td}>Engineer</td>
                      <td style={tableStyles.td}>Office</td>
                      <td style={tableStyles.td}>Field Visit</td>
                      <td style={tableStyles.td}>Fiber Team</td>
                      <td style={tableStyles.td}>DOC-REF</td>
                      <td style={tableStyles.td}>Subject</td>
                      <td style={{ ...tableStyles.td, ...tableStyles.actionsCell }}>
                        <div style={tableStyles.actionIcons}>
                          <button title="View" style={{ ...tableStyles.iconButton, ...tableStyles.viewBtn }}>
                            <FaEye size={14} />
                          </button>
                          <button title="Update" style={{ ...tableStyles.iconButton, ...tableStyles.editBtn }}>
                            <FaEdit size={14} />
                          </button>
                          <button title="Delete" style={{ ...tableStyles.iconButton, ...tableStyles.deleteBtn }}>
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyTasks;