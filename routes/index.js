var express = require('express'),
    router = express.Router(),
    request = require('request').defaults({
        headers: {
            'cache-control': 'no-cache'
        }
    }),
    Throttle = require('throttle');

function hrdiff(t1, t2) {
    var s = t2[0] - t1[0];
    var mms = t2[1] - t1[1];
    return s * 1e9 + mms;
}

/* GET home page. */
router.route('/').get((req, res, next) => {
    res.render('index', {
        title: 'Proxy'
    });
});

router.route('/query').get((req, res) => {
    var k = req,
        rate = 1,
        throttle;
    if (k.query.count < 3) {
        rate = 100;
    } else {
        rate = 0.5;
    }
    throttle = new Throttle(rate * 1024);
    request({
        uri: 'https://content.guardianapis.com/search',
        qs: {
            'api-key': 'ae8ed1df-85e3-4181-bf7d-c459e79ae1cc',
            'q': k.query.query
        }
    }).pipe(throttle).pipe(res);
});

router.route('/download').get((req, res)=>{
    var k = req,
        rate = 1,
        throttle;
    if (k.query.count < 2) {
        rate = 1000;
    } else {
        rate = 10;
    }
    throttle = new Throttle(rate * 1024);
    //uri = 'http://localhost:4000/Test_document_PDF.pdf'
    request({
        uri: 'http://localhost:4000/Test_document_PDF.pdf'
    }).pipe(throttle).pipe(res);
})

module.exports = router;