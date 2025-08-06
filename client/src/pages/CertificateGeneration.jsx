import React from 'react';

export default function CertificateGeneration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 text-gray-800">
      {/* Header */}
      <header className="bg-yellow-600 text-white py-4 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Certificate Generator</h1>
        <a
          href="/education"
          className="bg-white text-yellow-700 px-4 py-2 rounded shadow hover:bg-yellow-100 transition"
        >
          Back to Dashboard
        </a>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-semibold mb-6">Generate Your Certificate</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-left font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-left font-medium mb-1">Course/Event</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="e.g., DataHack 2025"
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded transition"
            >
              Generate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
