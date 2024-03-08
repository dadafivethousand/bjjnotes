import React, { useState } from 'react';
import { useLoggedIn } from "./Context";
import '../Stylesheets/NewPostForm.css';
// Ensure CSS is properly imported in your project

export default function InstructionalsForm({setShowForm}) {
  const [entries, setEntries] = useState([{ title: '', notes: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const { instructionalData, setInstructionalData, fetchInstructionalData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
  const [formData, setFormData] = useState({ name: '', entries:[] , user: userId});
  const [instructionalTitle, setInstructionalTitle] = useState('')

  const handleInstructionalTitleChange = (event) =>
  {
    setInstructionalTitle(event.target.value)
  }

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
    console.log(updatedEntries)
  };

  const addEntry = () => {
    setEntries([...entries, { title: '', notes: '' }]);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      entries, // This assumes entries is already structured correctly
      user: userId,
      name:instructionalTitle
    };
    // Submission logic here, e.g., an API call
    console.log('Form data:', updatedFormData);
    try {
      console.log('Attempting to add new entry');
      console.log(updatedFormData)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/instructional/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
      });
      if (!response.ok) {
          throw new Error('Failed to add post');
      }

      // Reset form data after successful submission
      setEntries([{ title: '', notes: '' }]);
      setShowForm(false)
      fetchInstructionalData()

  } catch (error) {
      console.error('Error adding post: ', error);
      setErrorMessage('Adding post failed: ' + error.message);
  }
  };

  return (
    <div className="bjj-training-form">
      <button className="close-button" onClick={() => setShowForm(false)}>X</button>
      <form className='InstructionalForm' onSubmit={handleSubmit}>
             <input
              placeholder='Instructional Name'
              type="text"
              value={instructionalTitle}
              onChange={handleInstructionalTitleChange} 
              required
            />
        {entries.map((entry, index) => (
          <div key={index} className="section">  
            <input
              placeholder='Heading'
              type="text"
              value={entry.title}
              onChange={(e) => handleEntryChange(index, 'title', e.target.value)}
              required
            />  
            <textarea
              placeholder='Notes'
              className='entry'
              value={entry.notes}
              onChange={(e) => handleEntryChange(index, 'notes', e.target.value)}
              required
            ></textarea>
            {entries.length > 1 && (
              <button type="button" onClick={() => removeEntry(index)}>Remove</button>
            )}
          </div>
        ))}
        <div className="AddEntryOrSubmit">
          <button type="button" onClick={addEntry}>Add a Set of Heading & Notes</button>
          <button type="submit">Submit</button>
        </div>
      
      </form>
    </div>
  );
}

 