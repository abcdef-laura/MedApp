import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Patient } from '../types/Patient';

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Patient Details</h1>
      <h2>{patient.name}</h2>
      <p><strong>Birth Date:</strong> {patient.birthDate}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
    </div>
  );
}
