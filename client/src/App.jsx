import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signin from './components/SignIn';
import Dashboard from './components/Dashboard';
import Education from './pages/education';
import Healthcare from './pages/healthcare';
import Agriculture from './pages/agriculture';
import OfflineFirstAid from './pages/offlinefirstaid';
import HealthGuides from './pages/healthguides';
import ImmunizationReminders from './pages/immunizationreminders';
import PatientRecords from './pages/patientrecords';
import OfflineLessons from './pages/offlinelessons';
import LocalQuizzes from './pages/localquizzes';
import CertificateGeneration from './pages/certificategeneration';
import CropCalendar from './pages/cropcalendar';
import WeatherAlerts from './pages/weatheralerts';
import FertilizerGuide from './pages/fertilizerguide';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/education" element={<Education />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/healthcare/offline-first-aid" element={<OfflineFirstAid />} />
        <Route path="/health-guides" element={<HealthGuides />} />
        <Route path="/immunization-reminders" element={<ImmunizationReminders />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/education/offline-lessons" element={<OfflineLessons />} />
        <Route path="/local-quizzes" element={<LocalQuizzes />} />
        <Route path="/education/certificate-generation" element={<CertificateGeneration />} />
        <Route path="/agriculture/crop-calendar" element={<CropCalendar />} />
        <Route path="/weather-alerts" element={<WeatherAlerts />} />
        <Route path="/agriculture/fertilizer-guide" element={<FertilizerGuide />} />
      </Routes>
  );
}

export default App;