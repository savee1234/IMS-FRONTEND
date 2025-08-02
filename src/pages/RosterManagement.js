import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const employees = ['John Doe', 'Jane Smith', 'Mark Taylor', 'Alice Moore'];

const RosterManagement = () => {
  const [shifts, setShifts] = useState([
    { name: 'Morning', from: '00:00', to: '12:00' },
    { name: 'Evening', from: '12:00', to: '18:00' },
    { name: 'Night', from: '18:00', to: '23:59' },
  ]);

  const [roster, setRoster] = useState(
    daysOfWeek.map((day) => ({
      day,
      shifts: {
        Morning: '',
        Evening: '',
        Night: '',
      },
    }))
  );

  const [newShift, setNewShift] = useState({ name: '', from: '', to: '' });

  const handleEmployeeSelect = (dayIndex, shiftName, value) => {
    const updated = [...roster];
    updated[dayIndex].shifts[shiftName] = value;
    setRoster(updated);
  };

  const handleAddShift = () => {
    if (newShift.name && newShift.from && newShift.to) {
      setShifts([...shifts, newShift]);
      setNewShift({ name: '', from: '', to: '' });
    }
  };

  const saveRoster = () => {
    console.log('Saved Roster:', roster);
    alert('✅ System Roster Successfully Saved');
  };

  const saveShift = () => {
    console.log('Saved Shifts:', shifts);
    alert('✅ System Roster Shift Successfully Saved');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">
        ✅ Weekly Roster View <small className="text-muted"></small>
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Day / Shift</th>
              {shifts.map((shift, index) => (
                <th key={index}>{shift.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roster.map((row, dayIndex) => (
              <tr key={row.day}>
                <td>{row.day}</td>
                {shifts.map((shift, shiftIndex) => (
                  <td key={shiftIndex}>
                    <select
                      className="form-select"
                      value={row.shifts[shift.name] || ''}
                      onChange={(e) =>
                        handleEmployeeSelect(dayIndex, shift.name, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {employees.map((emp, empIndex) => (
                        <option key={empIndex} value={emp}>
                          {emp}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mt-5">➕ Add New Shift</h4>
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Shift Name"
            value={newShift.name}
            onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            className="form-control"
            value={newShift.from}
            onChange={(e) => setNewShift({ ...newShift, from: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            className="form-control"
            value={newShift.to}
            onChange={(e) => setNewShift({ ...newShift, to: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-outline-primary w-100" onClick={handleAddShift}>
            Add Shift
          </button>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success" onClick={saveRoster}>
          💾 Save Roster
        </button>
        <button className="btn btn-secondary" onClick={saveShift}>
          💾 Save Shift
        </button>
      </div>
    </div>
  );
};

export default RosterManagement;
