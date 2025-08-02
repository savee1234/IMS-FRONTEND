// src/pages/ComplaintForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const ComplaintForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default form structure
  const defaultForm = {
    medium: '',
    customer: '',
    solution: '',
    issue: '',
    phone: '',
    email: '',
    callRecording: '',
    isRepeated: false,
    remark: '',
    attachment: null,
    mainRoster: '',
    subRosters: [],
  };

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Static dropdown options
  const mediums = ['Hotline - 011 202 9898', 'Customer Direct', 'Internal - GB/EB/LB', 'Email', 'WhatsApp', 'SMS'];
  const customers = [
    { name: 'John Doe', solutions: ['Reset Password', 'Reinstall App', 'Upgrade Plan'] },
    { name: 'Jane Smith', solutions: ['Check Connectivity', 'Update Billing Info'] },
    { name: 'Company XYZ', solutions: ['Assign Engineer', 'Remote Support'] },
  ];
  const callRecordings = ['Call_20250707_1234.wav', 'Call_20250707_1245.wav'];

  const employees = [
    { empNo: 'E001', name: 'Alice Johnson', designation: 'Technician' },
    { empNo: 'E002', name: 'Bob Lee', designation: 'Engineer' },
    { empNo: 'E003', name: 'Charlie Kim', designation: 'Support Staff' },
    { empNo: 'E004', name: 'Diana Smith', designation: 'Engineer' },
  ];

  const selectedCustomer = customers.find(c => c.name === form.customer);

  // Restore form if redirected from SelectAssigner
  useEffect(() => {
    if (location.state?.formData) {
      setForm(location.state.formData);
    }
  }, [location.state]);

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setForm(prev => {
      if (name === 'customer') return { ...prev, customer: val, solution: '', mainRoster: '', subRosters: [] };
      if (name === 'solution') return { ...prev, solution: val, mainRoster: '', subRosters: [] };
      return { ...prev, [name]: val };
    });
  };

  // Validate required fields
  const validate = () => {
    const newErrors = {};
    if (!form.medium) newErrors.medium = 'Please select a medium.';
    if (!form.customer) newErrors.customer = 'Please select a customer.';
    if (!form.solution) newErrors.solution = 'Please select a solution.';
    if (!form.issue || form.issue.trim().length < 10) newErrors.issue = 'Describe the issue (min 10 characters).';

    if (form.medium === 'Hotline - 011 202 9898') {
      if (!form.phone) newErrors.phone = 'Phone number required.';
      if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required.';
      if (!form.callRecording) newErrors.callRecording = 'Please select a call recording.';
    }

    if (form.isRepeated && !form.remark.trim()) newErrors.remark = 'Please add a remark.';
    if (!form.mainRoster) newErrors.mainRoster = 'Assign a main roster person.';
    if (!form.subRosters.length) newErrors.subRosters = 'Assign at least one sub roster person.';
    return newErrors;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    const newComplaint = {
      ...form,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    localStorage.setItem('complaints', JSON.stringify([...complaints, newComplaint]));

    setSuccess(true);
    setErrors({});
    setForm(defaultForm);

    setTimeout(() => setSuccess(false), 4000);
  };

  // Helper: get full name + designation
  const getEmployeeName = (empNo) => {
    const emp = employees.find(e => e.empNo === empNo);
    return emp ? `${emp.name} (${emp.designation})` : empNo;
  };

  // Remove sub assigner
  const handleRemoveSubAssigner = (empNoToRemove) => {
    setForm(prev => ({
      ...prev,
      subRosters: prev.subRosters.filter(empNo => empNo !== empNoToRemove),
    }));
  };

  return (
    <div className="container mt-4">
      <div className="p-4 bg-white shadow rounded">
        <h2 className="mb-4 text-primary">Complaint Onboarding Form</h2>

        {/* Success Message */}
        {success && <div className="alert alert-success">✅ Complaint submitted successfully!</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Medium */}
          <div className="mb-3">
            <label className="form-label">Channel / Medium</label>
            <select name="medium" className="form-select" value={form.medium} onChange={handleChange}>
              <option value="">-- Select Medium --</option>
              {mediums.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors.medium && <div className="text-danger">{errors.medium}</div>}
          </div>

          {/* Customer */}
          <div className="mb-3">
            <label className="form-label">Customer</label>
            <select name="customer" className="form-select" value={form.customer} onChange={handleChange}>
              <option value="">-- Select Customer --</option>
              {customers.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            {errors.customer && <div className="text-danger">{errors.customer}</div>}
          </div>

          {/* Solution */}
          {selectedCustomer && (
            <div className="mb-3">
              <label className="form-label">Solution</label>
              <select name="solution" className="form-select" value={form.solution} onChange={handleChange}>
                <option value="">-- Select Solution --</option>
                {selectedCustomer.solutions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.solution && <div className="text-danger">{errors.solution}</div>}
            </div>
          )}

          {/* Hotline-only fields */}
          {form.medium === 'Hotline - 011 202 9898' && (
            <>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Link Call Recording</label>
                <select name="callRecording" className="form-select" value={form.callRecording} onChange={handleChange}>
                  <option value="">-- Select Call --</option>
                  {callRecordings.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.callRecording && <div className="text-danger">{errors.callRecording}</div>}
              </div>
            </>
          )}

          {/* Issue Description */}
          <div className="mb-3">
            <label className="form-label">Issue Description</label>
            <textarea name="issue" className="form-control" value={form.issue} onChange={handleChange} rows="4" />
            {errors.issue && <div className="text-danger">{errors.issue}</div>}
          </div>

          {/* Assigners Section */}
          {form.solution && (
            <>
              <button
                type="button"
                style={{
                  width: '100%',
                  marginBottom: '16px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#0d6efd',
                  border: '1px solid #0d6efd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => navigate('/select-assigner', { state: { solution: form.solution, formData: form } })}
              >
                <span style={{ fontSize: '20px' }}>+</span> Add Assigners
              </button>

              {form.mainRoster && (
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#d1e7ff',
                  color: '#084298',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  border: '1px solid #b6d4fe'
                }}>
                  <strong>Main Assigner:</strong> {getEmployeeName(form.mainRoster)}
                </div>
              )}

              {form.subRosters.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <strong>Sub Assigners:</strong>
                  <ul style={{
                    marginTop: '8px',
                    padding: '0',
                    listStyle: 'none'
                  }}>
                    {form.subRosters.map(empNo => (
                      <li key={empNo} style={{
                        padding: '12px 16px',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        {getEmployeeName(empNo)}
                        <button
                          type="button"
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                          onClick={() => handleRemoveSubAssigner(empNo)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {errors.mainRoster && <div style={{ color: '#dc3545', marginBottom: '8px' }}>{errors.mainRoster}</div>}
              {errors.subRosters && <div style={{ color: '#dc3545', marginBottom: '8px' }}>{errors.subRosters}</div>}
            </>
          )}

          {/* Repeated Complaint */}
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" name="isRepeated" checked={form.isRepeated} onChange={handleChange} />
            <label className="form-check-label">This is a repeated complaint</label>
          </div>

          {form.isRepeated && (
            <div className="mb-3">
              <label className="form-label">Remarks</label>
              <textarea name="remark" className="form-control" value={form.remark} onChange={handleChange} rows="3" />
              {errors.remark && <div className="text-danger">{errors.remark}</div>}
            </div>
          )}

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label">Attachment (optional)</label>
            <input type="file" name="attachment" className="form-control" onChange={handleChange} />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
