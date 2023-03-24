const express = require("express");

const equipmentRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

equipmentRoutes.route("/equipment").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("equipments")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});