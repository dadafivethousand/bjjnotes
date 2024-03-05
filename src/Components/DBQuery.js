import React, { useState, useEffect } from 'react';
import { useLoggedIn } from "./Context";
import Post from './Post';
import '../Stylesheets/DBQuery.css';

export default function DataDisplayComponent() {
  const { data, setData, fetchData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
  const [globalExpand, setGlobalExpand] = useState(null);
  function formatDate(dateString) {
    // Define an array of month names
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Split the input dateString into its components
    const parts = dateString.split('-');
    const year = parts[0];
    const month = months[parseInt(parts[1], 10) - 1]; // Convert "03" to 3, then get the month name
    const day = parseInt(parts[2], 10); // Remove leading zero from day if present
  
    // Construct the formatted date string
    return `${month} ${day}, ${year}`;
  }
   // State to hold the data
 
  
    useEffect(() => {       
      if (userId) {
        fetchData();
      }

  }, [userId]); // The empty array ensures this effect runs only once after the initial render

  const handleExpandAll = () => {
    setGlobalExpand(true); // Ensures all posts are expanded
  };
  
  const handleMinimizeAll = () => {
    setGlobalExpand(false); // Ensures all posts are minimized
  };
  
  return loggedIn && (
    <div className='DataDisplayOuterContainer'>
    <div className='DataDisplayContainer'>
      <div className='GlobalButtons'>
      <button onClick={handleExpandAll}>
        <div className='ButtonText'>Expand</div>
      <div className='ButtonText'>All</div>
      </button>
    <button onClick={handleMinimizeAll}>
    <div className='ButtonText'>Minimize</div>
  <div className='ButtonText'>All</div>
    </button>
      </div>

{data.map(item => (
  <div key={item._id}>
   <Post globalExpand={globalExpand} data={data} setData={setData} id={item._id} date={formatDate(item.trainingDate)} title={item.title} goals={item.preTrainingGoals} right={item.whatWentRight} wrong={item.whatWentWrong} takeaways={item.takeAways} />
  </div>
))}

    </div>
    </div>
    
  );
}

 