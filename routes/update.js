//maintenance-app /routes/update.js
//Routes for endpoints starting with /api/update...

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route POST api/items
// @desc Bulk update existing items
// @access Public
router.post('/status', (req, res) => {
    const oldStatus = req.body.oldStatus;
    const newStatus = req.body.newStatus;
    console.log('oldStatus',oldStatus);
    console.log('newStatus',newStatus);
    const query = {status: oldStatus};
    Item.updateMany(query, {
        $set: {
            status : newStatus, 
        }
    })
        .then(items => res.json(items));
});

function buildUpdateObject(name, description, location, priority, status, 
    isArchived, submitDate) {
    //Builds the object to be passed to the update function according
    //to inputs received from POST request
    //Arguments represent new and updated values

    let result = {};
    if (name) result['name'] = name;
    if (description) result['description'] = description;
    if (location) result['location'] = location;
    if (priority) result['priority'] = priority;
    if (status) result['status'] = status;
    if (isArchived) result['isArchived'] = isArchived;
    if (submitDate) result['submitDate'] = submitDate;

    console.log('updateObject', result);
    return result;
}

// @route POST api/items
// @desc Update existing item
// @access Public
router.post('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const priority = req.body.priority;
    const status = req.body.status;
    const isArchived = req.body.isArchived;
    const submitDate = req.body.submitDate;
    const updateObject = buildUpdateObject(name, description, location, 
                                priority, status, isArchived, submitDate)
    const query = {_id: id};
    Item.updateOne(query, {
        $set: updateObject
    })
        .then(item => res.json(item));
});

module.exports = router;