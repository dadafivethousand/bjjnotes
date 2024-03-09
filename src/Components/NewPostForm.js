import React, { useState } from 'react';
// import ReactQuill from 'react-quill'; // Commented out for now
import { useLoggedIn } from "./Context";
// import 'react-quill/dist/quill.snow.css'; // Commented out for now
import '../Stylesheets/NewPostForm.css';
 
export default function Form({setShowForm}) {
  
    const [errorMessage, setErrorMessage] = useState('');
    const { data, setData, fetchData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
    
    const [formData, setFormData] = useState({
        title: '',
        preTrainingGoals: '',
        whatWentRight: '',
        whatWentWrong: '',
        takeAways: '',
         
        user: userId
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        console.log('New Entry Added:', formData);

        try {
            console.log('Attempting to add new entry');
            console.log(formData)
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/posts/add`
            console.log("Full API URL:", apiUrl);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/add`, {
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
                preTrainingGoals: '',
                whatWentRight: '',
                whatWentWrong: '',
                takeAways: '',
                trainingDate: '',
                user: userId
            });
            setShowForm(false)
            fetchData()

        } catch (error) {
            console.error('Error adding post: ', error);
            setErrorMessage('Adding post failed: ' + error.message);
        }
    };

    return (
        <div className="bjj-training-form">
            <button className="close-button" onClick={() => setShowForm(false)}>X</button>
            <form onSubmit={handleSubmit}>
            <div className='DateAndTitle'>                   
                    <input
                        type="date"
                        name="trainingDate"
                        value={formData.trainingDate}
                        onChange={handleChange}
                    />
              
                 
                    <input className='title'
                        type="text"
                        placeholder='title'
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
            
                </div>
                <div className="section">
                
                    {/* <ReactQuill value={formData.whatWentRight} onChange={handleWhatWentRightChange} /> */}
                    <textarea
                    className='entry'
                    placeholder= 'What Went Right'
                        name="whatWentRight"
                        value={formData.whatWentRight}
                        onChange={handleChange}
                    />
                </div>
                {/* React Quill for What Went Wrong - Now using textarea */}
                <div className="section">
                 
                    {/* <ReactQuill value={formData.whatWentWrong} onChange={handleWhatWentWrongChange} /> */}
                    <textarea className='entry'
                     placeholder= 'What Went Wrong'
                        name="whatWentWrong"
                        value={formData.whatWentWrong}
                        onChange={handleChange}
                    />
                </div>
                {/* React Quill for Take-Aways - Now using textarea */}
                <div className="section">
                 
                    {/* <ReactQuill value={formData.takeAways} onChange={handleTakeAwaysChange} /> */}
                    <textarea
                    className='entry'
                    placeholder= 'General TakeAways'
                        name="takeAways"
                        value={formData.takeAways}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
