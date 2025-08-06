import React, { useState, useEffect } from "react";
import axios from "axios";

function FirstAidGuides({ category }) {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuides = async () => {
      const cacheKey = `firstAidData_${category}`;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setGuides(JSON.parse(cached));
          setLoading(false);
        } else {
          const res = await axios.get(`http://localhost:5000/api/firstaid?category=${category}`);
          localStorage.setItem(cacheKey, JSON.stringify(res.data));
          setGuides(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch failed, loading from cache:", err);
        setError("Offline mode: Loaded from cache");

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setGuides(JSON.parse(cached));
        }

        setLoading(false);
      }
    };

    fetchGuides();
  }, [category]);

  if (loading) return <p className="text-center mt-4 text-gray-600">Loading guides...</p>;

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        First Aid Guides - {category}
      </h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {guides.length === 0 ? (
        <p className="text-gray-500">No guides available for this category.</p>
      ) : (
        <ul className="space-y-6">
          {guides.map((guide) => (
            <li key={guide._id || guide.id} className="bg-green-50 border-l-4 border-green-500 pl-4 py-3 rounded">
              <h2 className="text-xl font-semibold text-green-800">{guide.title}</h2>
              {guide.content ? (
                <p className="text-gray-700 mt-1">{guide.content}</p>
              ) : (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {guide.steps?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FirstAidGuides;
