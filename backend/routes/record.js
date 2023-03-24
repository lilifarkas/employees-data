const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/connection");

const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        position: req.body.position,
        level: req.body.level,
        equipment: req.body.equipment,
    };
    db_connect.collection("records").insertOne(user, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            position: req.body.position,
            level: req.body.level,
            equipment: req.params.equipment
        },
    };
    db_connect
        .collection("records")
        .updateOne(query, newValues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(query, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;