import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/avbadmin/article');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="bg-background bg-gradient-to-r from-green-400 to-blue-500/40 text-primary-foreground min-h-screen p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <h3 className="text-2xl text-black font-bold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <a href={article.url} className="text-blue-500 hover:underline mb-2 block">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
