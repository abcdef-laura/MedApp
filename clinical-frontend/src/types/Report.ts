export interface Report {
  id: number;
  patientId: number;
  patient_name: string; // pentru a afișa în tabel
  report_date: string;
  findings: string;
}
