import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import "../Stylesheets/LoginForm.css"
export default function UpdatePassword({setFormType}){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { token } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (confirmPassword !== password ) {
          alert('passwords dont match')
          return
      }
        try {
          const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, password }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to reset password');
          }
    
          const data = await response.json();
          // Handle success
          console.log('Password reset successful', data.message);
          alert('Your password has been successfully reset.');
          setFormType('')
          
    
        } catch (error) {
          console.error('Error resetting password:', error);
          alert('Error resetting password. Please try again.');
        }
      };
    return(
        <form className="form-container" onSubmit={handleSubmit}>
        < input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter new password" 
        />
           <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
        />
        <button type="submit">Reset Password</button>
      </form>
    )

}