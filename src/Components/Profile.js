import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'
import "../Stylesheets/Profile.css"
import { useNavigate } from 'react-router-dom';
export default function Profile({ logout }){
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const activateDropDown = () => {
        setDropdown(true)
    }

    const deactivateDropDown = () => {
        setDropdown(false)
    }
    const route =() => {
        navigate('/pwchange')
    }



    return(<>
    <div onMouseEnter={activateDropDown} onMouseLeave={deactivateDropDown} className="ProfileContainer">

 <FontAwesomeIcon icon={faUserCircle} className="profile-icon"   />
 <ul className={`Dropdown ${dropdown?'visible': ''}`}>
            <li onClick={route}>  Change Password</li>
            <li onClick={logout}>Logout</li>
        </ul>
    </div>
    </>
    )
}