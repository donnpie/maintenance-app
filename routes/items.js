//maintenance-app /routes/items.js
//Routes for endpoints starting with /api/item...

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route GET api/items/status
// @desc Get all possible values of status field
// @access Public
router.get('/status', (req, res) => {
    Item.distinct("status")
        .then(items => res.json(items));
});

// @route GET api/items/status/:status
// @desc Get items with the given status
// @access Public
router.get('/status/:status', (req, res) => {
    const status = req.params.status;
    Item.find({status: status})
        .sort({submitDate: -1})
        .then(items => res.json(items));
});

// @route GET api/items
// @desc Get item by id
// @access Public
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id)    
        .then(items => res.json(items));
});

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({status: 1, submitDate: -1})
        .then(items => res.json(items));
});

// @route POST api/items
// @desc Create new item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        priority: req.body.priority
    });
    //console.log(newItem);
    newItem.save()
        .then(item => res.json(item)) //Save to db and return to client
        .catch(err => console.log(err));
});


module.exports = router;