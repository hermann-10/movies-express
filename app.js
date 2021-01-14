const express = require('express');
const app = express();

const PORT = 3000;

app.use('/public', express.static('public')); //.use permet d'indiquer quel middleware on aimerait ajouter

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {
    //res.send('Bientôt des films ici même');
    res.render('movies') //pour utiliser un template il faut utiliser la méthode render, il sait automatiquement qu'on utilise un template. Pas besoin également de préciser le format .ejs car on déclarer ceci plus haut : app.set('view engine', 'ejs');
});

/*app.get('/movie-details', (req, res) => {
    res.render('movie-details');
});*/

app.get('/movies/add', (req, res) => {
    res.send('Prochainement, un formulaire pour réaliser des ajouts ici)');
});

app.get('/movies/:id', (req, res) => { //indique à node qu'un paramètre va être indiqué //Ajout d'un paramètre à une route
    const id = req.params.id;
    const title = req.params.title;
    //res.send(`Film numéro ${id}`);
    res.render('movie-details', { movieId: id });
});

app.get('/', (req, res) => {
    res.render('index') //pour utiliser un template il faut utiliser la méthode render, il sait automatiquement qu'on utilise un template. Pas besoin également de préciser le format .ejs car on déclarer ceci plus haut : app.set('view engine', 'ejs');
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); //utilisation d'une template string avec -> `${PORT}`
});