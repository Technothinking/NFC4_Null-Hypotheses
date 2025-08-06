import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import certificateTemplate from '../assets/certificate_template.jpg';

const CertificateGeneration = () => {
  const certificateRef = useRef();
  const [name, setName] = useState(() => {
    return localStorage.getItem('smartseva_user_name') || '';
  });
  const [date, setDate] = useState('');

  const handleDownload = () => {
    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${name}_certificate.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded w-64"
        />
        <input
          type="date"
          placeholder="Enter Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded w-64"
        />
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download Certificate
        </button>
      </div>

      <div
        ref={certificateRef}
        className="relative w-[800px] h-[600px] border-2 border-gray-300 shadow-lg"
      >
        <img
          src={certificateTemplate}
          alt="Certificate Template"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute top-[300px] w-full text-center text-2xl font-semibold text-black">
          {name}
        </div>
        <div className="absolute bottom-[80px] right-[100px] text-md font-medium text-black">
          {date}
        </div>
      </div>
    </div>
  );
};

export default CertificateGeneration;