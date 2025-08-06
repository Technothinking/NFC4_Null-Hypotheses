import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import SignIn from './components/SignIn';
import Education from './pages/education';
import Healthcare from './pages/healthcare';
import Agriculture from './pages/agriculture';

import OfflineFirstAid from './pages/OfflineFirstAid';
import CropCalendar from './pages/CropCalendar';
import CertificateGeneration from './pages/CertificateGeneration';



import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/education" element={<Education />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/healthcare/offline-first-aid" element={<OfflineFirstAid />} />
        <Route path="/agriculture/crop-calendar" element={<CropCalendar />} />
        <Route path="/certificate-generation" element={<CertificateGeneration />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);