import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Report } from '../types/Report';
import { Link } from 'react-router-dom';

export default function ReportsTable() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const deleteReport = (id: number) => {
    axios.delete(`http://localhost:5000/api/reports/${id}`)
      .then(fetchReports)
      .catch(err => console.error(err));
  };

  useEffect(() => {
  axios.get('http://localhost:5000/api/reports')
    .then(res => {
      console.log(res.data); // Aici poți verifica datele
      setReports(res.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Clinical Reporting Tool</h1>
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
                  <td>
                    <Link to={`/patients/${r.patientId}`}>{r.patient_name}</Link>
                  </td>
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
