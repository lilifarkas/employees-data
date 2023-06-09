const express = require("express");

const equipmentRoutes = express.Router();

const dbo = require("../db/connection");

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

equipmentRoutes.route("/equipment/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("equipments")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

equipmentRoutes.route("/equipment/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let equipment = {
        name: req.body.name,
        type: req.body.type,
        amount: req.body.amount,
    };
    db_connect.collection("equipments").insertOne(equipment, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

equipmentRoutes.route("/equipment/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            amount: req.body.amount,
        },
    };
    db_connect
        .collection("equipments")
        .updateOne(query, newValues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

equipmentRoutes.route("/equipment/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect.collection("equipments").deleteOne(query, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = equipmentRoutes;