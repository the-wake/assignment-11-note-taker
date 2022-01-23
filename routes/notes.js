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
})

// I guess this needed a response in order to get the page to render after the delete request comes through due to the await notes.json()?
nts.delete('/:id', (req, res) => {
    const removeId = req.params.id;
    if (removeId) {
        readAndRemove(removeId, './db/db.json');

        const response = {
            status: 'Success',
            body: `Removing note ID# ${removeId}`
        };
        res.json(response)
    } else {
        res.json('An error occured.')
    }
})

module.exports = nts;
