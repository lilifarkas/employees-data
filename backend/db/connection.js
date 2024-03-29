const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {
    connectToServer: async function (callback) {
        try {
            await client.connect();
            _db = client.db();
            console.log("Successfully connected to MongoDB.");
            callback();
        } catch (err) {
            callback(err);
        }
    },

    getDb: function () {
        return _db;
    },
};

// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
//
// let _db;
//
// module.exports = {
//     connectToServer: function (callback) {
//         client.connect(function (err, db) {
//             if (db)
//             {
//                 _db = db.db("employees");
//                 console.log("Successfully connected to MongoDB.");
//             }
//             return callback(err);
//         });
//     },
//
//     getDb: function () {
//         return _db;
//     },
// };