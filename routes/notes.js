const nts = require('express').Router();
const readAndAppend = require('../helpers/fsUtils.js')

const noteData = require('../db/db.json')

nts.get('/', (req, res) =>
    // This might need to be promisified in the helper script. Will test.
    res.json(noteData)
);

nts.post('/', (req, res) => {
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            };
// Curious about why this path is relative to the server, when the noteData const is defined relative to this file.
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
