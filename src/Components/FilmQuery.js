import '../Stylesheets/Film.css'
import React, { useState, useEffect } from 'react';
import Film from './Film';
import { useLoggedIn } from "./Context";
export default function FilmQuery() {
  const [globalExpand, setGlobalExpand] = useState(null);
        const { filmData, setFilmData, fetchFilmData, userId, loggedIn, toggleLoggedIn } = useLoggedIn();
          useEffect(() => {       
            if (userId) {
                fetchFilmData();
            }
        }, [userId]); // The empty array ensures this effect runs only once after the initial render
        const sortedFilmData = [...filmData].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
       
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
           
          
      {sortedFilmData.map(item => (
      
        <div key={item._id}>
         <Film globalExpand={globalExpand} filmData={filmData}  setFilmData={setFilmData} id={item._id}   title={item.title} notes={item.notes} url={item.url} />
        </div>
      ))}
      
          </div>
        );
      }
      

 