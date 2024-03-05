import {useState, useEffect} from 'react'
import '../Stylesheets/Post.css'
export default function Disclaimer ({ setSelectedIdForDeletion, del, id, title, setDisclaimer}) {
  
    return(
        <div className='DisclaimerContainer'>
            <div className='WarningText'>Are you sure you want to delete this post?</div>
            <div className='DisclaimerButtons'>
               
                <button onClick={() => {setDisclaimer(false)
                setSelectedIdForDeletion(null);} // Reset the selected ID
                 }>
                    Cancel  
                </button>
                <button onClick={()=>del(id)}>
                    Confirm Delete
                </button>
            </div>
            
        </div>
    )

}
