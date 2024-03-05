import React, { useState } from 'react';
import { useLoggedIn } from "./Context";
// Assuming CSS is imported elsewhere in your application
import '../Stylesheets/NewPostForm.css';
export default function FilmForm({setShowForm}) {
 
  const [errorMessage, setErrorMessage] = useState('');
  const { filmData, setFilmData, fetchFilmData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
  const [formData, setFormData] = useState({ title: '', url:'', notes: '' , user: userId});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submission logic here, e.g., an API call
 
    console.log('Form data:', formData);
    try {
      console.log('Attempting to add new entry');
      console.log(formData)
      const response = await fetch('http://localhost:3000/api/film/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      if (!response.ok) {
          throw new Error('Failed to add post');
      }

      // Reset form data after successful submission
      setFormData({
          title: '',
           notes:'',
           url:'',
           user: userId
      });
      setShowForm(false)
      fetchFilmData()

  } catch (error) {
      console.error('Error adding post: ', error);
      setErrorMessage('Adding post failed: ' + error.message);
  }
  };

  return (
    <div className="bjj-training-form">
      <button className="close-button" onClick={() => setShowForm(false)}>X</button>
      <form className='FilmForm' onSubmit={handleSubmit}>
      
 
          <input
            placeholder='Title'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
  
     
          <input
            placeholder='URL (if applicable)'
            className='entry'
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
     
        <div className="section">
         
          <textarea
          placeholder='Notes'
            className='entry'
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 