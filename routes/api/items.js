// bring in Express to use features
const express = require('express');

// use Express Router
const router = express.Router();

// bring in the item model to make quries to the mongoDB
const Item = require('../../models/Item');

//// create routes
// @route       GET api/items
// @desc        Get All Items
// @access    Public
// instead of app.get() like we would do in server.js, we use the express router
// this .get() starts at the end of /api/items because of how we setup server.js
router.get('/', (req, res) => {
        //fetch all items from DB
        //take model called 'Item'
        Item.find() // returns a Promise
                .sort({ date: -1 }) // mongoose can sort by descending (-1) or ascending (1)
                .then(items => res.json(items)); // JSON api that we make readable
});

// @route       POST api/items
// @desc        Create an item
// @access    Public
// instead of app.post() like we would do in server.js, we use the express router
// this .post() starts at the end of /api/items because of how we setup server.js
router.post('/', (req, res) => {
        // construct an object to insert into the DB
        const newItem = new Item({
                name: req.body.name
                // date is put in automatically
        }); // 'Item() is using our model created above connected to ItemSchema
        newItem.save() // saves new Item to the DB
                .then(item => res.json(item)); // Promise based, gives us back the item that it's saving
});
//// USING Postman ////
// change to 'POST'
// go to Header:
//      key: Content-Type, value: application/json
// go to Body:
//      when using JSON, the keys and values should be in double quotes "keys", "values"
//      use raw
/*      {
                "name": "pasta"
        }
*/

// @route       DELETE api/items/:id
// @desc        Delete an item
// @access    Public
// instead of app.post() like we would do in server.js, we use the express router
// this .post() starts at the end of /api/items because of how we setup server.js
router.delete('/:id', (req, res) => {
        // find item by id first, we have to fetch id from params
        Item.findById(req.params.id)
                .then(item =>
                        item.remove().then(() => {
                                // Promised base (what does remove return?) whose method is this?
                                res.json({
                                        success: true
                                });
                        })
                )
                .catch(err => res.status(404).json({ success: false }));
});

// export default router
module.exports = router;
