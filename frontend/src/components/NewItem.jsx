import { useState } from 'react';
import TextField from './TextField';
import Button from './Button';
import './NewItem.css';

const NewItem = () => {
    const [ values, setValues] = useState({})

    const handleClick = (e) => {
        e.preventDefault();
        //console.log("handleClick was triggered");
        const name = e.target.elements.name.value;
        const description = e.target.elements.description.value;
        const location = e.target.elements.location.value;
        const priority = e.target.elements.priority.value;

        //Set the state variable
        setValues(buildValueObject(name, description, location, priority));

        //Send values to server to create new object
        const uri = "http://localhost:5000/api/items";
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(values);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(uri, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    const buildValueObject = (name, description, location, priority) => {
        //Builds the object to be passed to the set function according
    
        let result = {};
        if (name) result['name'] = name;
        if (description) result['description'] = description;
        if (location) result['location'] = location;
        if (priority) result['priority'] = priority;
    
        //console.log('valueObject', result);
        return result;
    }

    return (
        <div className="newItem-container">
            <form onSubmit={handleClick}>
                <TextField label="Name" name="name" placeholder="Name"/>
                <TextField label="Description" name="description" placeholder="Description"/>
                <TextField label="Location" name="location" placeholder="Location"/>
                <TextField label="Priority" name="priority" placeholder="Priority"/>
                <Button label="Add"/>
            </form>
            {values.name}
        </div>
    );
}

export default NewItem;