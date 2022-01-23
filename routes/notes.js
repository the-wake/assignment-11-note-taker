const nts = require('express').Router();
const readAndAppend = require('../helpers/fsUtils.js')



nts.get('/api/notes', (req, res) =>
    // This might need to be promisified in the helper script. Will test.
    res.json(noteData)
);

nts.post('/api/notes', (req, res) => {
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
