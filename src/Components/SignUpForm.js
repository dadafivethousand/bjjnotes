import { useState, useEffect } from "react";
import '../Stylesheets/LoginForm.css'
import { useNavigate } from "react-router-dom";

export default function SignUpForm({setFormType}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [start, setStart] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        setStart(true)
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword !== password ) {
            alert('passwords dont match')
            return
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password })
            });
        
            if (!response.ok) {
                const errorBody = await response.json(); // Assuming this gives us { message: "Username already exists." }
                throw new Error(errorBody.message); // Creates an Error object with "Username already exists." as the message
            }
            
            // Handle successful signup
            console.log('nice')
            setFormType('Login')
        } catch (error) {
            console.error('Signup Error:', error);
            setErrorMessage(error.message); // error.message here is "Username already exists."
        }
          
      };
      

    return (
        <div className={`modal-background ${start? "appear": ""}`}>
    <div className="error-message">
 {errorMessage && <p>{errorMessage}</p>}
 </div>
        <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
             
                
                <input
                    type="text"
                    placeholder="UserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
           
       
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
           
           
            <button type="submit">Sign Up</button>
             
        </form>
        </div>
    );
}
