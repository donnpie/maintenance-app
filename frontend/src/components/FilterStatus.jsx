import React, { useEffect, useState } from 'react';
import Button from './Button';
import { Table } from 'react-bootstrap';
import './Table.css';

function FilterStatus() {
    //Declare state variables
    const [ selectedStatus, setSelectedStatus ] = useState(""); //Hold the value used to filter the status field
    const [ statusItems, setStatusItems ] = useState([]); //Hold the possible values for status field
    const [ items, setItems ] = useState([]); //holds maintenance items
    const [ newStatus, setNewStatus ] = useState(""); //holds the new status value for bulk update

    //Make request to express server to find status
    useEffect(() => {
        const endPoint = 'http://localhost:5000/api/items/status';
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setStatusItems(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedStatus(e.target.elements.status.value);

        //Get filtered items from databse
        const endPoint = 'http://localhost:5000/api/items/status/' + selectedStatus;
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setItems(data);
            })
            .catch(err => console.log(err));
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('new status: ', e.target.elements.status.value);
        setNewStatus(e.target.elements.status.value);

        //Do bulk update of status
        const endPoint = 'http://localhost:5000/api/update/status';
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            oldStatus: selectedStatus,
            newStatus: newStatus});

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(endPoint, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    const renderItem = (item, idx) => {
        //Generates the jsx for a single user
        return (
            <tr key={idx}>
                <td><a href={'/update/' + item._id}>{item._id}</a></td>       
                <td>{item.name}</td>       
                <td>{item.description}</td>       
                <td>{item.location}</td>       
                <td>{item.submitDate}</td>       
                <td>{item.status}</td>       
                <td>{item.priority}</td>       
                <td>{item.isArchived ? "Yes" : "No"}</td>       
             </tr>
        );
    }

    const itemsTableData = items.map((item, idx) => {
        return renderItem(item, idx);
    });

    const showTable = (items, title, data) => {
        //Generates the jsx for multiple items
        return (
            <div className="table-container">
            <h1>{title}</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID (Click to edit item)</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Submit Date</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Archived?</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
             </Table>
            </div>
        );
    }

    const renderStatus = (item, idx) => {
        return (
            <option key={idx}>{item}</option> 
        )
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="status" >
                Select status to filter:
                <select name="status" id="" 
                    className="m-4 p-1"
                >
                    {statusItems.map((item, idx)=>{
                        return renderStatus(item, idx);
                    })}
                </select>
            </label>
            <Button label="Filter" />
        </form>
        {showTable(items, "All results:", itemsTableData)}
        <p>To do bulk status update, select the new status below and click "Update"</p>
        <form onSubmit={handleUpdate}>
            <label htmlFor="status" >
                Select new status:
                <select name="status" id="" 
                    className="m-4 p-1"
                >
                    {statusItems.map((item, idx)=>{
                        return renderStatus(item, idx);
                    })}
                </select>
            </label>
            <Button label="Update" />
        </form>
        
        </>   
    );
}

export default FilterStatus;