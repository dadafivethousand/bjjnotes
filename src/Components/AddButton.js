import '../Stylesheets/AddButton.css';
import { useState, useEffect } from 'react';
import Form from './NewPostForm';
import { useLoggedIn } from "./Context";
import FilmForm from './FilmForm';
import InstructionalsForm from './InstructionalsForm';
import { useLocation } from 'react-router-dom';

export default function AddButton() {
    const [showForm, setShowForm] = useState(false);
    const { loggedIn } = useLoggedIn();
    const location = useLocation(); 
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        switch(location.pathname) {
            case '/journal':
                setSelection('journal');
                break;
            case '/film':
                setSelection('film');
                break;
            case '/instructionals':
                setSelection('instructionals');
                break;
            default:
                setSelection(null); // Reset or handle default case as needed
        }
    }, [location.pathname]); // Dependency array ensures this runs only when location.pathname changes

    let formVariable;
    switch(selection) {
        case 'journal':
            formVariable = <Form setShowForm={setShowForm} />;
            break;
        case 'film':
            formVariable = <FilmForm setShowForm={setShowForm} />;
            break;
        case 'instructionals':
            formVariable = <InstructionalsForm setShowForm={setShowForm} />;
            break;
    }

    const toggleForm = () => {
        setShowForm(prev => !prev);
    };

    return (
        <>
            {loggedIn && selection ? (
                <>
                    <div className="AddButtonContainer" onClick={toggleForm}>
                       <div > + Add A New Entry </div>
                      
                   
                    </div>
                    <div>
                        {showForm ? formVariable : null}
                    </div> 
                </>
            ) : null}
        </>
    );
}
