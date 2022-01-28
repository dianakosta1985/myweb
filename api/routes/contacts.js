var express = require('express');
var router = express.Router();
const dbo = require('../db/conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get all contacts');
});


router.route("/get-all").get(async function (req, res) {
    const dbConnect = dbo.getDb();
   
    dbConnect
      .collection("contacts")
      .find({})//.limit(3)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
        //dbo.close();
      });
  });


  router.route("/add-contact").post(async function (req, res) {

    const newContact = req.body;
    const dbConnect = dbo.getDb();
   
    dbConnect
      .collection("contacts")
      .insertOne(newContact, function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          console.log(result);
          res.json(result);
        }
        //dbo.close(); 
      });
  });

  router.route("/delete-contact").delete(async function (req, res) {

    const contact = req.body;
    console.log("diana" + contact);
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("contacts")
      .deleteOne(contact, function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          console.log(result);
          res.json(result);
        }
        //dbo.close(); 
      });
  });





module.exports = router;
