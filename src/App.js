import './Stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoggedInProvider } from './Components/Context';
import AddButton from './Components/AddButton';
import Form from './Components/NewPostForm';
import DataDisplayComponent from './Components/DBQuery';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Instructional from './Components/Instructional';
import Film from './Components/Film';
import { useState } from 'react';
import FilmQuery from './Components/FilmQuery';
import InstructionalQuery from './Components/InstructionalQuery';
import LandingPage from './Components/LandingPage';
 
import UpdatePassword from './Components/UpdatePassword';
import LoginForm from './Components/LoginForm';
import PasswordChange from './Components/PasswordChange';
 

function App() {
  return (
    <Router>
      <div className="App">
        <LoggedInProvider>
          <Navbar />
          <AddButton />
           <Routes>
           <Route path="/" element={<LandingPage />} />
            <Route path="/instructionals" element={<InstructionalQuery />} />
            <Route path="/journal" element={<DataDisplayComponent />} />
            <Route path="/film" element={<FilmQuery />} />
            <Route path="/pwupdate/:token" element={<LandingPage />} />  
            <Route path="/pwchange" element={<PasswordChange />  } />
          </Routes>
        </LoggedInProvider>
      </div>
    </Router>
  );
}

export default App;
