import { useState, useEffect } from 'react';
import '../Stylesheets/Post.css'; // Reuse the same CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { useLoggedIn } from "./Context";
import Disclaimer from './Disclaimer'
export default function Instructional({ globalExpand, instructionalData, setInstructionalData, id, name,  entries }) {
  const [editInstructionalId, setEditInstructionalId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { disclaimer, setDisclaimer } = useLoggedIn();
  const [EditInstructionalFormData, setEditInstructionalFormData] = useState({
    name:'',
    entries:
  {title: '',
    notes: ''}
});
useEffect(() => {
  // This effect ensures that the local state aligns with the global state when it changes.
  setIsExpanded(globalExpand);
}, [globalExpand]);

const handleToggle = () => {
  setIsExpanded(prevState => !prevState);
};

const handleEditChange = (event, index = null) => {
  const { name, value } = event.target;
  if (index !== null) {
      // Handle changes in the entries array
      setEditInstructionalFormData(prevFormData => {
          const updatedEntries = [...prevFormData.entries];
          updatedEntries[index] = { ...updatedEntries[index], [name]: value };
          return { ...prevFormData, entries: updatedEntries };
      });
  } else {
      // Handle changes in the name field
      setEditInstructionalFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
      }));
  }
};




  const handleEditSubmit = async (event) => { 
    event.preventDefault();
    console.log('EditInstructionalFormData', EditInstructionalFormData)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/instructional/edit/${editInstructionalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(EditInstructionalFormData),
      });
      if (response.ok) {
        console.log('Post updated successfully');
        // update local state after successful update
        setInstructionalData(prevData => prevData.map(item => 
            item._id === editInstructionalId ? { ...item, ...EditInstructionalFormData } : item
          ));
        setEditInstructionalFormData({
          name:'',
          entries:
        {title: '',
          notes: ''}
      })
        setEditInstructionalId(null)
      } else {
        console.log('Error updating post');
      }
    } catch (error) {
      console.log('Network error');
    }
  };

 


  const startEditInstructional = (id) => {
    const instructionalDataItem = instructionalData.find(instructional => instructional._id === id);
    console.log(instructionalDataItem, 'suckmyballs+65')
    setEditInstructionalId(id);
    setEditInstructionalFormData(instructionalDataItem)
  };

  const deleteInstructional = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/instructional/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Instructional deleted successfully');
        setInstructionalData(prevData => prevData.filter(item => item._id !== id));
      } else {
        console.log('Error deleting film');
      }
    } catch (error) {
      console.log('Network error');
    }
  };

  return (
    <div className='Entry'>
      {editInstructionalId === id ? (
      <div className="EditForm">
      <form onSubmit={handleEditSubmit}>
      <div className='SubmitOrCancel'>
      <div className="form-actions">
  <button type="submit" className="icon-button">
    <FontAwesomeIcon icon={faCheck} size="2x" title="Submit" />
  </button>
  <button type="button" className="icon-button" onClick = {() => setEditInstructionalId(null)}>
    <FontAwesomeIcon icon={faTimes} size="2x" style={{ color: 'red' }} title="Cancel" />
  </button>
  </div>
        
      </div>

      <input
            type="text"
            name="name" // Make sure to have the 'name' attribute match the state property
            value={EditInstructionalFormData.name}
            onChange={handleEditChange} // No index needed for the name field
            required
/>

{EditInstructionalFormData.entries.map((entry, index) => (
  <div className='EditForm' key={index}>
    <input
      type="text"
      name="title"
      value={entry.title}
      onChange={(e) => handleEditChange(e, index)}
    />
    <textarea className='tall'
      name="notes"
      value={entry.notes}
      onChange={(e) => handleEditChange(e, index)}
    />
  </div>
))}
 
      </form>
    </div>
    
      ) : (
        <div>
           <div className='InstructionalDate'>
           <div className="PlusMinusButton">      
            <button onClick={()=>handleToggle()}>
            {isExpanded ? (
                          // Expanded view conten  
                          <FontAwesomeIcon icon={faAngleDoubleUp} />
                      ) : (
                          // Collapsed view content
                          <FontAwesomeIcon icon={faAngleDoubleDown} />
                      )
                  }
            </button>
          </div>

              <div className='Bold' >{name}</div>
              <div className="DeleteOrEdit1">
               <FontAwesomeIcon icon={faEdit} onClick={() => startEditInstructional(id)} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteInstructional(id)} style={{ color: 'red' }} />
             </div>
              </div>
              <div className={` ${!isExpanded ? 'Invisible' : 'Rest'}`}>
       {entries.map((entry, index) => (
        <div key={index}>
           <h4 className="title">{entry.title}</h4>
           <div className='Rest'>
             {entry.notes && (
               <div>
                 <div>{entry.notes}</div>
               </div>
             )}
           </div>
           </div>
       ))}
             </div>
        </div>
      )}
      {
        disclaimer && <Disclaimer id={id} del={deleteInstructional} setDisclaimer={setDisclaimer} />
      }
    </div>
    
  );
}
