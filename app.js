const express = require('express');
const app = express();

const PORT = 3000;

app.get('/movies', (req,res) => {
    res.send('Bientôt des films ici même');
});

app.get('/movies/:id', (req, res) => { //indique à node qu'un paramètre va être indiqué
    const id = req.params.id;
    res.send(`Film numéro ${id}`);
}) 

app.get('/', (req,res) => {
    res.send('Hello <b>World</b>');
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); // utilisation d'une template string avec -> `${PORT}`
});