// ComplaintOnboarding.jsx
// Drop this file into your React app (e.g., src/pages/ComplaintOnboarding.jsx)
// Then import and render <ComplaintOnboarding />
// --------------------------------------------------
import React, { useMemo, useState } from "react";
import "./ComplainForm.css"; // Paste the CSS below into this path

export default function ComplainForm() {
  // ------- Dummy data (replace with real API data) --------
  const organizations = ["SLT", "Mobitel", "ABC Pvt Ltd", "Other"];
  const categories = ["Billing", "Connectivity", "Technical", "Other"];
  const solutions = ["Pending", "In Progress", "Resolved", "Escalated"];
  const mediums = ["Hotline", "Email", "WhatsApp", "SMS", "Walk-in"];
  const mediumSources = ["Customer", "Field Ops", "Retail", "Corporate"];

  const staff = useMemo(
    () => [
      { empNo: "E001", name: "Kumara Perera", designation: "Engineer", availability: "Office" },
      { empNo: "E014", name: "R. Silva", designation: "Technician", availability: "Roster" },
      { empNo: "E023", name: "Anjalika D.", designation: "Coordinator", availability: "None" }
    ],
    []
  );

  // ------- Form state --------
  const [form, setForm] = useState({
    requestRef: "",
    categoryType: "",
    organization: "",
    solutionName: "",
    medium: "",
    mediumSource: "",
    complaint: "",

    // contact
    searchMobile: "",
    contactName: "",
    email: "",
    mobile: "",
    officeMobile: "",
    title: "Mr.",

    // assignment
    mainAssignment: "",
    subAssignment: "",
    docRef: "",
    docSubject: "",
    remarks: ""
  });

  const [notFoundMsg, setNotFoundMsg] = useState("");

  // ------- Handlers --------
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSearchContact = () => {
    // TODO: call your backend to search by mobile number
    // This mock just "finds" if number ends with 7
    const found = form.searchMobile.trim().endsWith("7");
    if (found) {
      setNotFoundMsg("");
      update("contactName", "Auto Found Person");
      update("email", "found.person@slt.lk");
      update("mobile", form.searchMobile);
      update("officeMobile", "0112345678");
      update("title", "Mr.");
    } else {
      setNotFoundMsg("** No contact person with that mobile number is found. Please insert details **");
      update("mobile", form.searchMobile);
      update("contactName", "");
      update("email", "");
      update("officeMobile", "");
    }
  };

  const onReset = () => {
    setForm({
      requestRef: "",
      categoryType: "",
      organization: "",
      solutionName: "",
      medium: "",
      mediumSource: "",
      complaint: "",
      searchMobile: "",
      contactName: "",
      email: "",
      mobile: "",
      officeMobile: "",
      title: "Mr.",
      mainAssignment: "",
      subAssignment: "",
      docRef: "",
      docSubject: "",
      remarks: ""
    });
    setNotFoundMsg("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend
    alert("Submitted! Check console for payload.");
    console.log("Complaint payload", form);
  };

  return (
    <div className="content-wrapper" style={{
      position: 'relative',
      zIndex: 1,
      padding: '1rem',
      marginTop: '1rem',
      maxWidth: '1400px',
      margin: '1rem auto 0 auto'
    }}>
      {/* Page Header */}
      <header className="page-header" style={{
        textAlign: 'center',
        marginBottom: '1rem',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 0.5rem 0',
          textAlign: 'center'
        }}>
           Complaint Onboard Module
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.1rem',
          margin: 0,
          fontWeight: '400'
        }}>
          Submit and manage customer complaints efficiently
        </p>
      </header>

      <form className="config-content" style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        padding: '2rem'
      }} onSubmit={onSubmit}>
        
        {/* ======= SECTION: Complaint Details ======= */}
        <section className="config-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              📋 Request Details
            </h2>
          </div>

          <div className="grid grid-2">
            <Field label="Request Reference">
              <input
                className="input"
                value={form.requestRef}
                onChange={(e) => update("requestRef", e.target.value)}
                placeholder="REQ-0001"
              />
            </Field>

            <Field label="Category Type">
              <select
                className="input"
                value={form.categoryType}
                onChange={(e) => update("categoryType", e.target.value)}
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Organization">
              <select
                className="input"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
              >
                <option value="">Select…</option>
                {organizations.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Solution Name">
              <select
                className="input"
                value={form.solutionName}
                onChange={(e) => update("solutionName", e.target.value)}
              >
                <option value="">Select…</option>
                {solutions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Medium">
              <select
                className="input"
                value={form.medium}
                onChange={(e) => update("medium", e.target.value)}
              >
                <option value="">Select…</option>
                {mediums.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>

            <Field label="Medium Source">
              <select
                className="input"
                value={form.mediumSource}
                onChange={(e) => update("mediumSource", e.target.value)}
              >
                <option value="">Select…</option>
                {mediumSources.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>

            <Field label="Complaint" className="full">
              <textarea
                className="input textarea"
                rows={4}
                value={form.complaint}
                onChange={(e) => update("complaint", e.target.value)}
                placeholder="Type the complaint here…"
              />
            </Field>
          </div>
        </section>

        {/* ======= SECTION: Contact Person Details ======= */}
        <section className="config-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              👤 Contact Person Details
            </h2>
          </div>

          <div className="search-row">
            <div className="search-inline">
              <label className="label">Mobile No:</label>
              <input
                className="input"
                value={form.searchMobile}
                onChange={(e) => update("searchMobile", e.target.value)}
                placeholder="Type here"
              />
              <button type="button" className="btn" onClick={onSearchContact}>
                Search
              </button>
            </div>
            {notFoundMsg && <div className="note">{notFoundMsg}</div>}
          </div>

          <div className="grid grid-2">
            <Field label="Contact Person Name">
              <input
                className="input"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="Full name"
              />
            </Field>
            <Field label="Email">
              <input
                className="input"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@example.com"
                type="email"
              />
            </Field>

            <Field label="Mobile No" className="mobile-no-field">
              <input
                className="input"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                placeholder="07XXXXXXXX"
              />
            </Field>

            <Field label="Office Mobile No">
              <input
                className="input"
                value={form.officeMobile}
                onChange={(e) => update("officeMobile", e.target.value)}
                placeholder="011XXXXXXX"
              />
            </Field>

            <Field label="Title">
              <select
                className="input"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              >
                {[
                  "Mr.",
                  "Mrs.",
                  "Ms.",
                  "Dr.",
                  "Prof."
                ].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* ======= SECTION: Assignment ======= */}
        <section className="config-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(248, 250, 252, 0.5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              👥 Assignment
            </h2>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Emp No</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Availability</th>
                  <th className="w-180">Main Assignment</th>
                  <th className="w-180">Sub Assignment</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.empNo}>
                    <td>{s.empNo}</td>
                    <td>{s.name}</td>
                    <td>{s.designation}</td>
                    <td>{s.availability}</td>
                    <td>
                      <select
                        className="input"
                        value={form.mainAssignment}
                        onChange={(e) => update("mainAssignment", e.target.value)}
                      >
                        <option value="">Select…</option>
                        <option>Field Visit</option>
                        <option>Remote Fix</option>
                        <option>Call Back</option>
                        <option>Escalate L2</option>
                      </select>
                    </td>
                    <td>
                      <select
                        className="input"
                        value={form.subAssignment}
                        onChange={(e) => update("subAssignment", e.target.value)}
                      >
                        <option value="">Select…</option>
                        <option>Fiber Team</option>
                        <option>Billing Team</option>
                        <option>Tech Support</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-2 top-gap">
            <Field label="Document Reference">
              <div className="inline">
                <input
                  className="input"
                  value={form.docRef}
                  onChange={(e) => update("docRef", e.target.value)}
                  placeholder="DOC-REF"
                />
                <label className="upload">
                  <input type="file" onChange={() => {}} />
                  Upload
                </label>
              </div>
            </Field>

            <Field label="Document Subject">
              <input
                className="input"
                value={form.docSubject}
                onChange={(e) => update("docSubject", e.target.value)}
                placeholder="Subject"
              />
            </Field>

            <Field label="Remarks" className="full">
              <textarea
                className="input textarea"
                rows={4}
                value={form.remarks}
                onChange={(e) => update("remarks", e.target.value)}
                placeholder="Any special notes…"
              />
            </Field>
          </div>

          <div className="actions" style={{
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(248, 250, 252, 0.3)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <button type="button" className="btn ghost" onClick={onReset} style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px'
            }}>Reset Form</button>
            <button type="submit" className="btn primary" style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px'
            }}>Submit Complaint</button>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`field ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <label className="label" style={{
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.25rem'
      }}>{label}</label>
      <div className="control">{children}</div>
    </div>
  );
}

