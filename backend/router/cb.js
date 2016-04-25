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

var baseRate = [
    {
        t: Date.now() - 3000*1000,
        rate: 3.75,
    },
    {
        t: Date.now() - 3000*900,
        rate: 4.75,
    },
    {
        t: Date.now() - 1000*800,
        rate: 3.15,
    },
    {
        t: Date.now() - 1000*712,
        rate: 2.75,
    },
    {
        t: Date.now() - 1000*520,
        rate: 5.75,
    },
    {
        t: Date.now() - 1000*450,
        rate: 6.75,
    },
    {
        t: Date.now() - 1000*366,
        rate: 6.75,
    },
    {
        t: Date.now() - 1000*344,
        rate: 7.75,
    },
    {
        t: Date.now() - 1000*234,
        rate: 3.75,
    }
];

router.get('/chart', function(req, res){
    console.log('chart');

    var rateMax = 8;
    var rateMin = 4;
    var volumeMax = 100;
    var volumeMin = 50;

    var dealData = [];
    var baseRate = [];

    for (var i = 0; i < 25; i++) {

        dealData.push({
            t: parseInt(Date.now() - Math.random()*1000),
            rate: rateMax+Math.random()*0.1,
            vol: volumeMax+Math.random()*volumeMin
        });

        baseRate.push({
            t: parseInt(Date.now() - Math.random()*1000),
            rate: rateMax+Math.random()*0.1,
        });

    }

    dealData.sort(function(a, b){
        return a.t<b.t?1:-1;
    });

    baseRate.sort(function(a, b){
        return a.t<b.t?1:-1;
    });

    for (var i = 0; i < dealData.length; i++) {
        console.log(dealData[i].t);
    }

    var data = {
        code: 0,
        dealData: dealData,
        baseRate: baseRate
    };
    res.send(data);
});
