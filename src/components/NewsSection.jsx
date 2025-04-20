// components/NewsSection.jsx
import React, { useEffect, useState } from 'react';

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call to fetch news
    fetch('/api/news') // This endpoint should return an array of news items
      .then((response) => response.json())
      .then((data) => setNewsItems(data))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🗞️ Latest News</h2>
      <ul className="list-disc list-inside">
        {newsItems.map((news, index) => (
          <li key={index} className="mb-2">
            <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;
