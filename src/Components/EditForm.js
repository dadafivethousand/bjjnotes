import React, { useState, useEffect } from 'react';
import { useLoggedIn } from "./Context";
 
import '../Stylesheets/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
export default function EditForm({editPostId, setEditPostId} ) {
    const [entries, setEntries] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { data, setData, fetchData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
     const [EditFormData, setEditFormData] = useState({
        title: '',
        preTrainingGoals: '',
        whatWentRight: '',
        whatWentWrong: '',
        takeAways: '',
        trainingDate:'',
        user: userId
    });
    useEffect(()=>{
        const postData = data.find(post => post._id === editPostId);
        if (postData) {
            setEditFormData(postData);
        }
    },[data, editPostId])

    const handleEditSubmit = async (event) => { 
        event.preventDefault();
         
        try {
          const response = await fetch(`http://localhost:3000/api/posts/edit/${editPostId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(EditFormData),
          });
          if (response.ok) {
            console.log('Post updated successfully');
            // update local state after successful update
            setData(prevData => prevData.map(item => 
                item._id === editPostId ? { ...item, ...EditFormData } : item
              ));
            setEditFormData({
                title: '',
                preTrainingGoals: '',
                whatWentRight: '',
                whatWentWrong: '',
                takeAways: '',
                trainingDate:'',
                user: userId
            })
            setEditPostId(null)
          } else {
            console.log('Error updating post');
          }
        } catch (error) {
          console.log('Network error');
        }
      };


    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
 

    return (
        
     
            <form className="EditForm" onSubmit={handleEditSubmit}>
                     <div className='DeleteOrEdit1'>
                
                <button   type="submit" className="icon-button">
                  <FontAwesomeIcon icon={faCheck} title="Submit" />
                </button>
                <button type="button" className="icon-button" onClick = {() => setEditPostId(null)}>
                  <FontAwesomeIcon icon={faTimes}   style={{ color: 'red' }} title="Cancel" />
                </button>
                             
                              </div>
      
           
                   
                    <input
                        
                        type="date"
                        name="trainingDate"
                        value={ EditFormData.trainingDate || ''}
                        onChange={handleEditChange}
                    />            
                <div className="EditForm">
             
                    <input  
                        type="text"
                        name="title"
                        value={EditFormData.title}
                        onChange={handleEditChange}
                    />
                </div>
                <div className="section">
               
                <div className='EditFormLabel'>What Went Right
                    </div>
                    <textarea
                    className='entry tall'
                        name="whatWentRight"
                        value={EditFormData.whatWentRight}
                        onChange={handleEditChange}
                    />
                </div>
 
                <div className="section">
                  
                <div className='EditFormLabel'>What Went Wrong
                    </div>
                    <textarea className='entry tall'
                        name="whatWentWrong"
                        value={EditFormData.whatWentWrong}
                        onChange={handleEditChange}
                    />
                </div>
            
                <div className="section">
               
                <div className='EditFormLabel'>Takeaways
                    </div>
                    <textarea  
                    className='entry tall'
                        name="takeAways"
                        value={EditFormData.takeAways}
                        onChange={handleEditChange}
                    />
                </div>


 
            </form>
      
    );
}
