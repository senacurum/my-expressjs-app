"use strict";
exports.__esModule = true;
var express_1 = require("express");
var pg_promise_1 = require("pg-promise");
var pgp = (0, pg_promise_1["default"])({});
var app = (0, express_1["default"])();
var port = 3003;
app.use(express_1["default"].json());
//var pgp = require('pg-promise')(/* options */)
//var db = pgp('postgres://postgres:532014@localhost:5432/postgres')
var db = pgp({
    user: 'pwzrbxfljgjtsc',
    password: 'bd30320e38a8cc8eb85d0160a732d612be434ed3834dcfd2b19cc0dd4cb78ae2',
    host: 'ec2-54-195-141-170.eu-west-1.compute.amazonaws.com',
    database: 'd7e0dng1ljmbor',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
app.get('/', function (req, res) {
    db.query('SELECT id,name,surname from "my_db"')
        .then(function (data) {
        res.send(data);
    })["catch"](function (error) {
        res.send(error);
    });
});
app.post("/", function (req, res) {
    db.one('INSERT INTO "my_db" (name,surname) VALUES($1,$2) RETURNING id', [req.body.name, req.body.surname], function (event) { return event.id; }).then(function (data) {
        res.send(data);
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
