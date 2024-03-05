import { useState } from "react";
import '../Stylesheets/Login.css';
import { useLoggedIn } from "./Context";
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginForm";

export default function Login() {
    const navigate = useNavigate();
    const { loggedIn, toggleLoggedIn } = useLoggedIn(); 

    const logout = () => {
        toggleLoggedIn();
       navigate('/')
    };

  
 
    return (
        
        <div className="LoginContainer">
            
                <div onClick={logout} className="Logout">
                    Logout
                </div>
       

      

         
        </div>
    );
}
