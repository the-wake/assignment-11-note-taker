const nts = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js')

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

module.exports = nts;


// TODO:
// * Add DELETE functionality.
