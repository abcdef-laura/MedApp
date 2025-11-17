import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportsTable from './components/ReportsTable';
import PatientTable from './components/PatientTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportsTable />} />
        <Route path="/patients/:id" element={<PatientTable />} />
      </Routes>
    </Router>
  );
}

export default App;

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Report = {
  id: number;
  patient_name: string;
  report_date: string;
  findings: string;
};

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [patientName, setPatientName] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [findings, setFindings] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const deleteReport = (id: number) => {
  axios.delete(`http://localhost:5000/api/reports/${id}`)
    .then(() => {
      // reîncarcă rapoartele după ștergere
      fetchReports();
    })
    .catch(err => console.error(err));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/reports', {
      patient_name: patientName,
      report_date: reportDate,
      findings: findings
    })
    .then(() => {
      setPatientName('');
      setReportDate('');
      setFindings('');
      fetchReports(); // reîncarcă lista după adăugare
    })
    .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Clinical Reporting Tool</h1>

      {// Form pentru adăugare raport }
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Findings"
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Report</button>
      </form>

      {// Tabel cu rapoarte }
      {loading ? <p>Loading...</p> : (
        reports.length === 0 ? <p>No reports yet</p> : (
          <table border={1} style={{ margin: 'auto', padding: '10px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Findings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.patient_name}</td>
                  <td>{new Date(r.report_date).toLocaleDateString()}</td>
                  <td>{r.findings}</td>
                  <td>
                    <button onClick={() => deleteReport(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default App;*/
