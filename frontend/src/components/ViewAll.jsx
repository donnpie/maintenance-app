import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import './Table.css';

function ViewAll() {

    //Make request to express server to find all items
    const [ items, setItems ] = useState([]);
    useEffect(() => {
        const endPoint = 'http://localhost:5000/api/items';
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setItems(data);
            })
            .catch(err => console.log(err));
    }, []);

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

                {/* <td><Link title="Link to user profile" href={'/user/github/' + item.login} /></td>
                <td><Link title="Link to home page" href={item.html_url} target="_blank" rel="noreferrer"/></td>            */}
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

    return (
        <>
            {showTable(items, "All results:", itemsTableData)}
        </>   
    );
}

export default ViewAll;