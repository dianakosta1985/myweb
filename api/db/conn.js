const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectionString = process.env.MONGO_URI; 
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
let con;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      con = db;
      dbConnection = db.db("DianasDB");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
  close: function(){
    con.close();
  }
};