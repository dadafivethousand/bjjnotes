import '../Stylesheets/Film.css'
import React, { useState, useEffect } from 'react';
import Instructional from './Instructional';
import { useLoggedIn } from "./Context";
export default function InstructionalQuery() {
  const [globalExpand, setGlobalExpand] = useState(null);
 
        const { setInstructionalData, instructionalData, setFilmData, fetchInstructionalData ,userId, loggedIn, toggleLoggedIn } = useLoggedIn();
          useEffect(() => {       
            if (userId) {
                fetchInstructionalData();
            }
        }, [userId]); // The empty array ensures this effect runs only once after the initial render
        const handleExpandAll = () => {
          setGlobalExpand(true); // Ensures all posts are expanded
        };
        
        const handleMinimizeAll = () => {
          setGlobalExpand(false); // Ensures all posts are minimized
        };
        return loggedIn && (
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
           
        
      {instructionalData.map(item => (
      
        <div key={item._id}>
         <Instructional  globalExpand={globalExpand}  instructionalData={instructionalData} setInstructionalData={setInstructionalData} id={item._id} name={item.name}  entries={item.entries} />
        </div>
      ))}
      
          </div>
        );
      }
      

 