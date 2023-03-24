const express = require("express");

const positionRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

positionRoutes.route("/position").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("position")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

module.exports = positionRoutes;