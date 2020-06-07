const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.send('Hi, try to use this API endpoint: /primi?n=8');
});

app.get('/primi', function(req, res) {
    let n = req.query.n;
    if (n <= 0 || !(/\d+/.test(n))) {
        return res.status(422).json({errors: ['Param "n" isn\'t valid, it must be a positive integer']});
    }
    let primeNumbers = [],
        possibleDividers,
        number = 2, //numero iniziale
        hasDivider;
    while (primeNumbers.length < n) {
        //Invece che cercare i possibili divisori facendo passare tutti i numeri interi minori del numero in questione
        // ho pensato che sarebbe bastato usare i numeri primi, precedentemente calcolati, come divisori.
        //Ho pensato anche che sarebbe stato utile salvare il json con i numeri primi nel filesystem del server
        // ma ho scoperto che node è più veloce di quello che pensavo e non avrebbe portato benefici significativi ai fini di questo progetto.
        possibleDividers = primeNumbers;
        hasDivider = false;
        for (possibleDivider of possibleDividers) {
            if (number % possibleDivider === 0) {
                hasDivider = true;
                break;
            }
        };

        if (!hasDivider) {
            primeNumbers.push(number);
        }
        number++;
    }

    return res.json(primeNumbers);
})

app.listen(port);