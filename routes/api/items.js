const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// routes   GET api/items
// desc     Get All Items
// access   Public

router.get('/', (req,res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// routes   GET api/items/:id
// desc     Get Item By id
// access   Public

router.get('/:id', (req,res) => {
    Item.findById(req.params.id)
        .then(items => res.json(items))
});

// routes   POST api/items
// desc     create an item
// access   Private

router.post('/', auth, (req,res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// routes   POST api/items/:id
// desc     update an item
// access   Private

router.patch('/:id', auth, async (req,res, next) => {
    try{
        const id = req.params.id;
        const update = req.body;
        const options = {new : true}
    
    
        const result = await Item.findByIdAndUpdate(id, update);
        res.send(result)
    }
    catch(error){
        error.message
    }
});

// routes   DELETE api/items:id
// desc     delete a item)
// access   Private

router.delete('/:id', auth, (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success : true})))
    .catch(err => res.status(404).json({success : false}));
});



module.exports = router;