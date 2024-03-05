import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../Images/logo.png';
 import SignUpForm from './SignUpForm';
 import LoginForm from './LoginForm';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from "./Context";
import '../Stylesheets/LandingPage.css'
import PasswordReset from './PasswordReset';
import UpdatePassword from './UpdatePassword';
export default function LandingPage() {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false);
    const { loggedIn, toggleLoggedIn } = useLoggedIn();
    const [showForm, setShowForm] = useState(false)
    const [formType, setFormType] = useState(false)
    const [email, setEmail] = useState('')
    const { token } = useParams();
    
 
    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    
  }
    
    useEffect(() => {
      // Trigger the animation as soon as the component mounts
      setIsVisible(true);
      if (token) {
        // Logic to handle password reset view
        setFormType('passwordUpdate'); // Example state update
        setShowForm(true) 
      }

      else if (loggedIn){
        navigate('/journal')
      }
    }, []);

   

    const showTheForm = (x) => {
        setFormType(x)
        setShowForm(true)
    }
 

    const hideTheForm = () => {
        setShowForm(false)
        setFormType('')
    }
    return !loggedIn && (
        <div className='LandingPageOuterContainer'>
        <div className={`LandingPageContainer ${formType ? 'Space' : ''}`}>
    <div className={`Text ${showForm ? 'Top':''}`}>
        <h1 className={`slide-in-horizontal ${isVisible ? 'visible' : ''}`}>
        BJJ Journal
      </h1>
      <p className={`slide-in-vertical ${isVisible ? 'visible' : ''}`}>
        Fastrack your development
   
      </p> 
      </div>

      {formType==='Login' && <LoginForm showTheForm={showTheForm} />} 
     {formType==='SignUp' && <SignUpForm setFormType={setFormType} />}        
     {formType==='PasswordReset' && <PasswordReset setShowForm={setShowForm} setFormType={setFormType} email={email} handleEmailChange={handleEmailChange} setEmail={setEmail}/>} 
     {formType==='passwordUpdate' && <UpdatePassword setFormType={setFormType} />} 
 

      <div className={`LoginSignupButtons ${showForm? 'Bottom':''} ${isVisible ? 'visible' : ''}`}>
      {formType==='Login' &&  <div> Don't have an account? <span onClick={()=>{showTheForm('SignUp')}} className='SignUp'  > Sign Up</span> </div>}
      
      {formType==='SignUp' && <div>Already have an account? <span onClick={()=>{showTheForm('Login')}} className='SignUp'  > Sign In</span></div>}
      {formType==='PasswordReset' && <div>  <span onClick={()=>{showTheForm('Login')}} className='SignUp'  >Back to Login Page</span></div>}
      </div>
      

      {!formType && 
    
      <div className='LoginOrSignup'>
        <div className='white'>{formType}</div>
        <button onClick={()=>{showTheForm('Login')}}>LOG IN</button>
        <button onClick={()=>{showTheForm('SignUp')}}>GET STARTED</button>
      </div>

      }
        </div>
        </div>
    )
}