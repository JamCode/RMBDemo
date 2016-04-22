var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/test', function(req, res){
    res.send('hello test');
});

var dealData = [
    {
        t: Date.now() - 1000*1000,
        rate: 3.75,
        vol: 34
    },
    {
        t: Date.now() - 1000*900,
        rate: 4.75,
        vol: 24
    },
    {
        t: Date.now() - 1000*800,
        rate: 3.15,
        vol: 54
    },
    {
        t: Date.now() - 1000*700,
        rate: 2.75,
        vol: 64
    },
    {
        t: Date.now() - 1000*600,
        rate: 5.75,
        vol: 74
    },
    {
        t: Date.now() - 1000*400,
        rate: 6.75,
        vol: 45
    },
    {
        t: Date.now() - 1000*350,
        rate: 6.75,
        vol: 30
    },
    {
        t: Date.now() - 1000*300,
        rate: 7.75,
        vol: 23
    },
    {
        t: Date.now() - 1000*200,
        rate: 3.75,
        vol: 48
    }
];

router.get('/chart', function(req, res){
    console.log('chart');
    console.log(JSON.stringify(req.query));
    res.send(dealData);
});
