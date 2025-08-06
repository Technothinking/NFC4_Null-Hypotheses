import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HealthTips({ category, trimester }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTips = async () => {
      const cacheKey = `healthTips_${category}_${trimester}`;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setTips(JSON.parse(cached));
          setLoading(false);
        } else {
          const res = await axios.get(`http://localhost:5000/api/health-tips?category=${category}&trimester=${trimester}`);
          localStorage.setItem(cacheKey, JSON.stringify(res.data));
          setTips(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch failed, loading from cache:", err);
        setError("Offline mode: Loaded from cache");

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setTips(JSON.parse(cached));
        }

        setLoading(false);
      }
    };

    fetchTips();
  }, [category, trimester]);

  if (loading) return <p className="text-center mt-4 text-gray-600">Loading health tips...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">
        Health Tips for {category} - {trimester}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {tips.length === 0 ? (
        <p className="text-gray-500">No tips found for this category and trimester.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          {tips.map((tip) => (
            <li key={tip._id || tip.id}>{tip.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HealthTips;
