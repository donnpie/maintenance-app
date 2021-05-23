import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from './TextField';
import Button from './Button';
import './NewItem.css';

const NewItem = () => {
    const { id } = useParams();
    //console.log(id);
    
    //Make get request to express server to get user by id
    const [ oldValues, setOldValues] = useState({})
    const [ newValues, setNewValues] = useState({})
    useEffect(() => {
        const endPoint = "http://localhost:5000/api/items/" + id;
        //console.log(endPoint);
        fetch(endPoint)
          .then(response => response.json())
          .then(result => {
              setOldValues(result);
              //console.log(result);
        })
          .catch(error => console.log('error', error));
    }, []);


    const handleClick = (e) => {
        e.preventDefault();
        //console.log("handleClick was triggered");
        const name = e.target.elements.name.value ? e.target.elements.name.value : "";
        const description = e.target.elements.description.value ? e.target.elements.description.value : "";
        const location = e.target.elements.location.value ? e.target.elements.location.value : "";
        const priority = e.target.elements.priority.value ? e.target.elements.priority.value : "";
        const status = e.target.elements.status.value ? e.target.elements.status.value : "";
        const isArchived = e.target.elements.isArchived.value === "true" ? true : false;
        
        //Set the state variable
        setNewValues(buildValueObject(name, description, location, priority, status, isArchived));

        //Send values to server to create new object
        const uri = "http://localhost:5000/api/update/" + id;
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(newValues);

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

    const buildValueObject = (name, description, location, priority, status, isArchived) => {
        //Builds the object to be passed to the set function according
        let result = {};
        if (name) result['name'] = name;
        if (description) result['description'] = description;
        if (location) result['location'] = location;
        if (priority) result['priority'] = priority;
        if (status) result['status'] = status;
        if (isArchived) result['isArchived'] = isArchived;
        //console.log('valueObject', result);
        return result;
    }

    const renderForm = () => {
        return (
            <div className="newItem-container">
                <form onSubmit={handleClick}>
                    <TextField label="ID" name="id" value={oldValues._id}/>
                    <TextField label="Name" name="name" placeholder={oldValues.name}/>
                    <TextField label="Description" name="description" placeholder={oldValues.description}/>
                    <TextField label="Location" name="location" placeholder={oldValues.location}/>
                    <TextField label="Priority" name="priority" placeholder={oldValues.priority}/>
                    <TextField label="Status" name="status" placeholder={oldValues.status}/>
                    <TextField label="Archived" name="isArchived" placeholder={oldValues.isArchived ? 'true' : 'false'}/>
                    <TextField label="Date submitted" name="submitDate" placeholder={oldValues.submitDate}/>
                    <Button label="Update"/>
                </form>
            </div>
        );
    }

    return (
        <>
        {renderForm()}
        </>
    );
}

export default NewItem;