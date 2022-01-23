const nts = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils.js')

// Curious as to how this works. (It's needed to make sure the data doesn't try to render before the request for db.json has been received.)
nts.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)))
);

nts.post('/', (req, res) => {
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
            };

            readAndAppend(newNote, './db/db.json')

            const response = {
                status: 'Success',
                body: newNote,
            };
            res.json(response)
        } else {
            res.json('Please enter a title and body text for your note.')
        }
    }
)

nts.delete('/:id', (req, res) => {
    const removeId = req.params.id;
    console.log(`Delete request recieved: ${removeId}`);
    readAndRemove(removeId, './db/db.json');
    }
)

// Save ID passed from the DELETE request body.
// Parse db.json and return the array.
// Use filter() to create a new array without the specified note

// myArray = myArray.filter(function( obj ) {
//     return obj.field !== 'money';

// });

module.exports = nts;
