import { useState, useEffect } from "react";
import { useLoggedIn } from "./Context";
import '../Stylesheets/LoginForm.css'
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
export default function PasswordReset({email, setShowForm, handleEmailChange, setEmail, setFormType}) {
    const { loggedIn, toggleLoggedIn, setUpUserId } = useLoggedIn();
    const [start, setStart] = useState(false)
    const [password, setPw] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
   
    useEffect(()=>{
        setStart(true)
    }, [])
    const sendResetEmailWithToken = (data) => {
        const templateParams = {
            user_name: data.username, // Use the username from the response
            email: email,
            reset_token: data.resetToken,
            link:  `http://localhost:3001/pwupdate/${data.resetToken}` // Construct the reset link
        };
    
        emailjs.send('service_ac8ffur', 'template_p9yr88s', templateParams, 'Io1a_LGqq4ieNQGD9')
            .then((result) => {
                console.log('Email sent:', result.text);
                 // Set the success message from the response

                // Handle email sent success
              //  setSuccessMessage("Password reset instructions have been mailed to you.")
             //   setSuccessMessage(null);
              //  setEmail('');
                 
               
                //  setFormType('fuckyou');
            }, (error) => {
                console.log('Email send error:', error.text);
                // Handle errors
                setErrorMessage("Failed to send reset email.");
            });
    };
    

 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('bitch bitch bitch')
            const response = await fetch('http://localhost:3000/api/users/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  email })
            }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                sendResetEmailWithToken(data.message)
                    setFormType(null)
                    setEmail('')

               
        
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Set the error message if response is not ok
            }
    
        } catch (error) {
            console.error('Password Reset Error: ', error); // Detailed error log
            setErrorMessage('Password Reset failed: ' + error.message); // Show error message to user
        }
        alert('Please check your email for password reset link');
    }

 
    return(<>
       
        <div className={`modal-background ${start? "appear": ""}`}>

     
        <form className="form-container" onSubmit={handleSubmit}>
     
                <div className="username">
                   
                    <input    
                    placeholder='Email' 
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
       
      
                <button type="submit">Reset Password</button>
                
             </form>
           
            </div>
            </>
    )

}