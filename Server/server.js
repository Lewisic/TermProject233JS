const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', 3000);

app.get('/dog', (req, res, next) => {
    setTimeout(() => {
        res.status(200).json({
            word: 'dog',
            image: './images/dog.png',
            definition: 'a domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, nonretractable claws, and a barking, howling, or whining voice.',
            sentence: 'That dog barks all day long.'
        });
    }, 3000);
});

app.get('/cat', (req, res, next) => {
    setTimeout(() => {
        res.status(200).json({
            word: 'cat',
            image: './images/cat.png',
            definition: 'a small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws. It is widely kept as a pet or for catching mice, and many breeds have been developed.',
            sentence: "the family's cat did an exemplary job of keeping the house and yard free of all rodents"
        });
    }, 3000);
});

const http = require('http').Server(app);
http.listen(app.get('port'), function () {
    console.log(`Express Server Listening on port ${app.get('port')}.`);
});
