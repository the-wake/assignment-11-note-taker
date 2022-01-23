const nts = require('express').Router();
const readAndAppend = require('../helpers/fsUtils.js')

const noteData = require('../db/db.json')

nts.get('/', (req, res) =>
    // This might need to be promisified in the helper script. Will test.
    res.json(noteData)
);

nts.post('/', (req, res) => {
    const { title, text } = req.body
    if (data) {
        const newNote = {
            title,
            text,
            }

            readAndAppend(newNote, '../db/db.json')

            const response = {
                status: 'Success',
                body: newNote,
            }
        }
    }
)

module.exports = nts;
