import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureCard from './components/FeatureCard';
import Signin from './components/SignIn';
import AgenticChat from './components/AgenticChat';

// Pages
import Education from './pages/education';
import Agriculture from './pages/agriculture';
import Healthcare from './pages/healthcare';
import OfflineFirstAid from "./pages/OfflineFirstAid";
import HealthGuides from "./pages/HealthGuides";
import ImmunizationReminders from "./pages/ImmunizationReminders";
import PatientRecords from "./pages/PatientRecords";
import OfflineLessons from "./pages/OfflineLessons";
import LocalQuizzes from "./pages/LocalQuizzes";
import CertificateGeneration from "./pages/CertificateGeneration";
import CropCalendar from './pages/CropCalendar';
import WeatherAlerts from './pages/WeatherAlerts';
import FertilizerGuide from './pages/FertilizerGuide';

// Multilingual Speech Recognition Component
const SpeechRecognitionComponent = ({ setLanguage }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="mb-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Multilingual Speech Recognition</h2>
      <select onChange={handleLanguageChange} className="p-2 rounded border border-gray-300">
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi (India)</option>
        <option value="mr-IN">Marathi (India)</option>
        <option value="gu-IN">Gujarati (India)</option>
      </select>
    </div>
  );
};

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const navigate = useNavigate();

  if (!showDashboard) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Signin setShowDashboard={setShowDashboard} />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen bg-violet-50 dark:bg-violet-900 text-violet-800 dark:text-pink-100">
            <Navbar />
            <main className="flex-1 p-6 overflow-auto">
              {/* Hero Section */}
              <section className="mb-12">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Project Dashboard</h1>
                    <p className="text-lg mb-6">
                      Quick search, personalized recommendations, and adaptive workflows—all in one place.
                    </p>
                    <div className="flex gap-3">
                      <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                        Get Started
                      </button>
                      <button className="px-6 py-3 border border-pink-600 rounded-lg hover:bg-bpink-50 transition">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-64 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-white font-semibold">
                      Hero Illustration / Image Placeholder
                    </div>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="mb-12">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-semibold text-center mb-6">Core Modules</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                      title="Education"
                      description="Offline lessons, quizzes, certificate generation & downloadable content."
                      icon="📚"
                      onClick={() => navigate('/education')}
                    />
                    <FeatureCard
                      title="Healthcare"
                      description="Access health records, get nearby help and offline awareness modules."
                      icon="🏥"
                      onClick={() => navigate('/healthcare')}
                    />
                    <FeatureCard
                      title="Agriculture"
                      description="Crop disease diagnosis, farming tips & agri tools offline and online."
                      icon="🌾"
                      onClick={() => navigate('/agriculture')}
                    />
                  </div>
                </div>
              </section>

              {/* Dashboard Overview */}
              <section className="mb-12">
                <div className="max-w-5xl mx-auto bg-pink dark:bg-pink-800 rounded-2xl p-6 shadow">
                  <h3 className="text-2xl font-bold mb-2">Dashboard Overview</h3>
                  <p>Put charts, stats, or recent activity here.</p>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="bg-pink-100 dark:bg-pink-800 border-t dark:border-gray-700 px-6 py-6">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="font-bold text-lg mb-2">SMARTSEVA</div>
                  <p className="text-sm">© {new Date().getFullYear()} SMARTSEVA. All rights reserved.</p>
                </div>
                <div className="flex gap-10">
                  <div>
                    <div className="font-semibold mb-1">Product</div>
                    <ul className="text-sm space-y-1">
                      <li><a href="#" className="hover:underline">Features</a></li>
                      <li><a href="#" className="hover:underline">Pricing</a></li>
                      <li><a href="#" className="hover:underline">Updates</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Company</div>
                    <ul className="text-sm space-y-1">
                      <li><a href="#" className="hover:underline">About</a></li>
                      <li><a href="#" className="hover:underline">Careers</a></li>
                      <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Support</div>
                    <ul className="text-sm space-y-1">
                      <li><a href="#" className="hover:underline">Help Center</a></li>
                      <li><a href="#" className="hover:underline">Terms</a></li>
                      <li><a href="#" className="hover:underline">Privacy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        }
      />

      {/* Routes */}
      <Route path="/education" element={<Education />} />
      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/agriculture" element={<Agriculture />} />
      <Route path="/firstaid" element={<OfflineFirstAid />} />
      <Route path="/health-guides" element={<HealthGuides />} />
      <Route path="/immunization-reminders" element={<ImmunizationReminders />} />
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/offline-lessons" element={<OfflineLessons />} />
      <Route path="/local-quizzes" element={<LocalQuizzes />} />
      <Route path="/certificate-generation" element={<CertificateGeneration />} />
      <Route path="/crop-calendar" element={<CropCalendar />} />
      <Route path="/weather-alerts" element={<WeatherAlerts />} />
      <Route path="/fertilizer-guide" element={<FertilizerGuide />} />
    </Routes>
  );
}
