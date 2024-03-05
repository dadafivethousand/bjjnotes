import {useState, useEffect, useContext, createContext } from 'react'
const LoginContext=createContext()

export const useLoggedIn = () =>useContext(LoginContext)

export const LoggedInProvider = ({ children }) => {
  const [selectedIdForDeletion, setSelectedIdForDeletion] = useState(null);
    const [data, setData] = useState([]);
    const [filmData, setFilmData] = useState([]);
    const [instructionalData, setInstructionalData] = useState([])
    const [disclaimer, setDisclaimer] = useState(false)
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedin') === 'true');
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    
    useEffect(() => {
        localStorage.setItem('loggedin', loggedIn.toString());
    }, [loggedIn]);

    useEffect(() => {
        localStorage.getItem('loggedin') === 'true'?
        localStorage.setItem('userId', userId):localStorage.setItem('userId', '')
    }, [loggedIn]);
    
    const setUpUserId = (id) => {
        setUserId(id);
    }
   

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn);  
        window.location.reload();
 

    };
 
    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${userId}`); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Data fetching failed');
          }
          const result = await response.json();
          setData(result); // Update the state with the fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors as needed
        }
      };

    const fetchFilmData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/film/${userId}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const result = await response.json();
        setFilmData(result); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };
    const fetchInstructionalData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/instructional/${userId}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const result = await response.json();
        setInstructionalData(result); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    return (
        <LoginContext.Provider value={{ selectedIdForDeletion, setSelectedIdForDeletion, setDisclaimer, disclaimer, fetchInstructionalData, fetchFilmData,  data, setData,filmData, setFilmData, instructionalData, setInstructionalData, fetchData, userId, setUpUserId, loggedIn, toggleLoggedIn }}>
            {children}
       </LoginContext.Provider>

    )
}