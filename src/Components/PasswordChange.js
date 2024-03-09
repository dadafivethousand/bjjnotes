import { useState, useEffect } from "react";
import { useLoggedIn } from "./Context";
import '../Stylesheets/LoginForm.css'
export default function PasswordChange() {
    const[currentPassword, setCurrentPassword] = useState('')
 
    const [newPassword, setNewPassword]=useState('')
    const [confirmNewPassword, setConfirmNewPassword]=useState('')
    const {  userId  } = useLoggedIn();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (newPassword !== confirmNewPassword ) {
            alert('passwords dont match')
            return
        }
 
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/change`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, currentPassword, newPassword }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to reset password');
          }
    
          const data = await response.json();
          // Handle success
          console.log('Password reset successful', data.message);
          alert('Your password has been successfully reset.');
          setConfirmNewPassword('')
          setNewPassword('')
          setCurrentPassword('')
           
    
        } catch (error) {
          console.error('Error resetting password:', error);
          alert('Error resetting password. Please try again.');
        }
      };
    return(
        <div className="PasswordChangeContainer">
                   <form className="form-container" onSubmit={handleSubmit}>
       
        < input 
          type="password" 
          value={currentPassword} 
          onChange={(e) => setCurrentPassword(e.target.value)} 
          placeholder="Current Password" 
        />
       
       
           <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="New Password" 
        />
             <input 
          type="password" 
          value={confirmNewPassword} 
          onChange={(e) => setConfirmNewPassword(e.target.value)} 
          placeholder="Confirm New Password" 
        />
        
        <button type="submit">Update Password</button>
      </form>

        </div>
 
    )
}