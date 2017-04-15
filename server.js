const express = require('express'),
    app = express(),
    port = 4000,
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    path = require('path'),
    ip = '127.0.0.1',
    stream = require('stream'),
    server_port = process.env.OPENSHIFT_NODEJS_PORT || port,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || ip;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/', routes);

app.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});