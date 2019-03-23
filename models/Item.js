// bring in mongoose to shape the structure of our data models
const mongoose = require('mongoose');

// create a 'Schema' which is the shape of our data model
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
        name: {
                type: String,
                required: true
        },
        date: {
                type: Date,
                default: Date.now
        }
});

// have to export for access
module.exports = Item = mongoose.model('item', ItemSchema);

// will the following work? Check later after it is up and running:
// const Item = mongoose.model('item', ItemSchema);
// module.exports = Item
