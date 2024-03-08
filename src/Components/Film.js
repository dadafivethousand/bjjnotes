import { useState, useEffect } from 'react';
import '../Stylesheets/Post.css'; // Reuse the same CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLoggedIn } from "./Context";
import Disclaimer from './Disclaimer'
export default function Film({ globalExpand, filmData, setFilmData, id, title, notes, url }) {
  const [editFilmId, setEditFilmId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { disclaimer, setDisclaimer, selectedIdForDeletion, setSelectedIdForDeletion} = useLoggedIn();
  const [EditFormData, setEditFormData] = useState({
    title: '',  
    url: '',
    notes: '',
});

useEffect(() => {
  setIsExpanded(globalExpand);
}, [globalExpand]);

const handleToggle = () => {
  setIsExpanded(prevState => !prevState);
};

const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
};

  const handleEditSubmit = async (event) => { 
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/film/edit/${editFilmId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(EditFormData),
      });
      if (response.ok) {
        console.log('Post updated successfully');
        // update local state after successful update
        setFilmData(prevData => prevData.map(item => 
            item._id === editFilmId ? { ...item, ...EditFormData } : item
          ));
        setEditFormData({
            title: '',
            url: '',
            notes: ''             
        })
        setEditFilmId(null)
      } else {
        console.log('Error updating post');
      }
    } catch (error) {
      console.log('Network error');
    }
  };

  const startEditFilm = (id) => {
    const filmDataItem = filmData.find(film => film._id === id);
    console.log(filmDataItem)
    setEditFilmId(id);
    setEditFormData(filmDataItem)
  };

  const deleteFilm = async (id) => {
    setDisclaimer(false)
    setSelectedIdForDeletion(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/film/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Film deleted successfully');
        setFilmData(prevData => prevData.filter(item => item._id !== id));
      } else {
        console.log('Error deleting film');
      }
    } catch (error) {
      console.log('Network error');
    }
  };

  return (
    <div className={`Entry ${isExpanded?'HideTopBorder':''}`}>   
      {editFilmId === id ? (
      <div >
      <form className="EditForm" onSubmit={handleEditSubmit}>
        <div className='SubmitOrCancel'>
                <div className="form-actions">
  <button type="submit" className="icon-button">
    <FontAwesomeIcon icon={faCheck} size="2x" title="Submit" />
  </button>
  <button type="button" className="icon-button" onClick = {() => setEditFilmId(null)}>
    <FontAwesomeIcon icon={faTimes} size="2x" style={{ color: 'red' }} title="Cancel" />
  </button>
  </div>
</div>
        <input
          name="title" // Ensure this matches the key in EditFormData
          value={EditFormData.title} // Use EditFormData for value
          onChange={handleEditChange} // Use the generalized handler
        />
           <input
          name="url" // Ensure this matches the key in EditFormData
          value={EditFormData.url} // Use EditFormData for value
          onChange={handleEditChange} // Use the generalized handler
        />
        <textarea className='tall'
          name="notes" // Ensure this matches the key in EditFormData
          value={EditFormData.notes} // Use EditFormData for value
          onChange={handleEditChange} // Use the generalized handler
        />

      </form>
    </div>
    
      ) : (<>
          <div className={`Date ${!isExpanded?'HideTopBorder':''}`}> 
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
          <div className='Bold'>{title}</div>
          <div className="DeleteOrEdit1">
          <FontAwesomeIcon icon={faEdit} onClick={() => startEditFilm(id)} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => {setDisclaimer(true); setSelectedIdForDeletion(id)} } style={{ color: 'red' }} />
    </div>
    </div>
          <div className="title">{url}</div>
         
          <div className={` ${!isExpanded ? 'Invisible' : 'Rest'}`}>
           
            {notes && (
              <div>
      
                <div>{notes}</div>
              </div>
            )}
        </div>
        </>
      )} {
        disclaimer & (selectedIdForDeletion === id) ?   <Disclaimer setSelectedIdForDeletion={setSelectedIdForDeletion} id={id} title={title}  del={deleteFilm} setDisclaimer={setDisclaimer} />: null
      }
    </div>
  );
}
