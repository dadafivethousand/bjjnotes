import { useState, useEffect } from "react";
import '../Stylesheets/Post.css'
import EditForm from "./EditForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import Disclaimer from './Disclaimer'
import { useLoggedIn } from "./Context";
export default function Post({expandAll, globalExpand, expandIndividual, setExpandAll, setExpandIndividual, data, setData, id, date, title, goals, right, wrong, takeaways}) {
const [editPostId, setEditPostId] = useState(null);
const [editDate, setEditDate] = useState('');
const [editGoals, setEditGoals] = useState('');
const [editTitle, setEditTitle] = useState('')
const [editWrong,setEditWrong] = useState('');
const [editRight, setEditRight] = useState('')
const [editTakeaways, setEditTakeaways] = useState('')
const [isExpanded, setIsExpanded] = useState(false);
const { disclaimer, setDisclaimer, selectedIdForDeletion, setSelectedIdForDeletion } = useLoggedIn();

useEffect(() => {
  // This effect ensures that the local state aligns with the global state when it changes.
  setIsExpanded(globalExpand);
}, [globalExpand]);
const handleToggle = () => {
  setIsExpanded(prevState => !prevState);
};

 
    const startEditPost = (id) => {
        // Find the post data for the post with this id
        const postData = data.find(post => post._id === id);
        // Set the editPostId state variable to this id, which could open the edit form/modal
        setEditPostId(id);
        // Set the editPostText state variable to the current text of the post
        
        setEditTitle(postData.title);
        setEditDate(postData.trainingDate)
        setEditGoals(postData.preTrainingGoals )
        setEditWrong(postData.whatWentWrong )
        setEditRight(postData.whatWentRight );
        setEditTakeaways(postData.takeAways);  
      };
 
 
    const deletePost = async(id)=> {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Post deleted successfully');
                // update local state after successful deletion
                setData(prevData => prevData.filter(item => item._id !== id));
             
            } else {
                console.log('Error deleting post');
            }
        } catch (error) {
            console.log('Network error');
        }
    }
  
    return(
         
  <div className={`Entry ${isExpanded?'HideTopBorder':''}`}>   


{editPostId ===  id ? (
 <EditForm editPostId={editPostId} setEditPostId={setEditPostId}/>
    
    ):
    <div className="PostContainer">

    <div className="Content"> 
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
    <div className="Italic"> {date}  </div>
    <div className="DeleteOrEdit1">
    <FontAwesomeIcon icon={faEdit} onClick={() => startEditPost(id)} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => {setDisclaimer(true); setSelectedIdForDeletion(id)} } style={{ color: 'red' }}  />
    </div>
    </div> 
    <div className="title">   {title}</div> 
    <div className={` ${!isExpanded ? 'Invisible' : 'Rest'}`}>
 
   { right &&(<div>  
    <div className="Header">WHAT WENT RIGHT</div>
    <div>{right}</div>
    </div> ) }
  { wrong && ( <div>
    <div className="middlerow">
    <div className="Header">WHAT WENT WRONG</div>
    <div>{wrong}</div>
    </div></div>)}


    {takeaways && (<div><div className="Header">GENERAL TAKEAWAYS</div>
    <div>{takeaways}</div></div>)}
    
  
    </div> </div> </div> }
    {
        disclaimer & selectedIdForDeletion === id ? <Disclaimer setSelectedIdForDeletion={setSelectedIdForDeletion} id={id} title={title}  del={deletePost} setDisclaimer={setDisclaimer} />:null
      }
</div>
 
    )

}