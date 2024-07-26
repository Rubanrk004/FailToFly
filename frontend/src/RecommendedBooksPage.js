import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendedBooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/avbadmin/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="bg-background bg-gradient-to-r from-green-400 to-blue-500/40 text-primary-foreground min-h-screen p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Recommended Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <h3 className="text-2xl text-black font-bold mb-2">{book.title}</h3>
            <p className=" text-black mb-4">{book.content}</p>
            <a href={book.url} className="text-blue-500 hover:underline mb-2 block">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooksPage;
