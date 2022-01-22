const express = require('express');
const path = require('path');
const PORT = 3001;

const noteData = require('./db/db.json')
const apiRouter = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => 
    res.json(noteData)
);





app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);





app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));