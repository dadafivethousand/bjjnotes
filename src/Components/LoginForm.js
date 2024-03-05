import { useState, useEffect } from "react";
import { useLoggedIn } from "./Context";
import '../Stylesheets/LoginForm.css'
import { useNavigate } from 'react-router-dom';
 
export default function LoginForm({displayLoginForm, showTheForm}) {

    const [username, setUserName] = useState('')
    const { loggedIn, toggleLoggedIn, setUpUserId } = useLoggedIn();
    const [start, setStart] = useState(false)
    const [password, setPw] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [incorrectLogin, setIncorrectLogin] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
        setStart(true)
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            }
            );
            if (response.ok) {
                setIncorrectLogin(null);
                console.log(loggedIn)
                const data = await response.json();
                toggleLoggedIn(true);         // Update login state
                setUpUserId(data.userId); // Update user ID in context
            } else {
                setIncorrectLogin('Incorrect username or password.')
                const errorData = await response.json(); // Assuming the server sends a JSON response with an error message
                setErrorMessage(errorData.message); // Update state to display the error message to the user
              }
        } catch (error) {
            console.error('Login Error: ', error); // Detailed error log
            setErrorMessage('Login failed: ' + error.message); // Show error message to user
        }
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }
    const handlePwChange = (event) => {
        setPw(event.target.value)
    }
    return(
        <div className={`modal-background ${start? "appear": ""}`}>
        <div className="error-message">
    {incorrectLogin && <p>{incorrectLogin}</p>}
</div>

        <form className="form-container" onSubmit={handleSubmit}>
     
                <div className="username">
                   
                    <input    
                    placeholder='Username' 
                        value={username}
                        onChange={handleUserNameChange}
                    />
                </div>
                <div className='pw'>

                    <input
                     placeholder='Password'
                    value={password}
                    onChange={handlePwChange}
                    type="password"
                    />

                </div>
      
                <button type="submit">Log In</button>
                <div className="forgotPassword" >Forgot Password? <span className="red" onClick={()=>showTheForm('PasswordReset')}> Click here</span></div>
             </form>
           
            </div>
    )

}