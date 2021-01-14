const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const PORT = 3000;
let frenchMovies = [];

app.use('/public', express.static('public')); //.use permet d'indiquer quel middleware on aimerait ajouter
//app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {
    const title = 'Meilleres films/séries';

    const frenchMovies = [
        { title: 'Le fabuleux destin de Sabrina', year: 2001},
        { title: 'Les frères scott', year: 2004},
        { title: 'Need for speed', year: 2003},
        { title: 'Power', year: 2019},
    ];
    console.log('Avant frenchMovies', frenchMovies);
    res.render('movies', { movies: frenchMovies, title: title }) //pour utiliser un template il faut utiliser la méthode render, il sait automatiquement qu'on utilise un template. Pas besoin également de préciser le format .ejs car on déclarer ceci plus haut : app.set('view engine', 'ejs');
});

let urlEncodedParser = bodyParser.urlencoded({ extended: false });

/*app.post('/movies', urlEncodedParser, (req, res) => {
    console.log('Le titre :', req.body.movieTitle);
    console.log('Lannée :', req.body.movieYear);
    const newMovie = { title: req.body.movieTitle, year: req.body.movieYear };
    frenchMovies = [...frenchMovies, newMovie];
    console.log('Après frenchMovies', frenchMovies);

    res.sendStatus(201);
}); */

app.post('/movies', upload.fields([]), (req, res) => {
    if(!req.body){
        return res.sendStatus(500);
    } else {
        const formData = req.body;
        console.log('formData: ', formData);
        const newMovie = { title : req.body.movieTitle, year: req.body.movieYear};
        frenchMovies = [...frenchMovies, newMovie];
        res.sendStatus(201);
    }
});

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