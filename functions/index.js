const functions = require('firebase-functions');
var cors = require('cors');
var express = require('express');
const moment = require('moment');
var bodyParser = require('body-parser');
const tz = require('moment-timezone');
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.calendercheck = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).json({status:0,message:"method not allowed"}).end();
      }
     
  functions.logger.info("Hello logs!", {structuredData: true});
  var {checked_date,timezone}=request.body;
  var DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
  //console.log((moment(checked_date, DATE_FORMAT).format(DATE_FORMAT) === checked_date));
 var checkdateformat = moment(checked_date, DATE_FORMAT).format(DATE_FORMAT) === checked_date;
 //   var startHour = moment(checked_date).format("HH:mm");
// console.log(startHour);
// var endHour = moment(checked_date).format("HH:mm");
// console.log(endHour);

//console.log(currentUserTimezone)
// var timezones ={currentUserTimezone};
// console.log(timezones)
 var currentUserTimezone = moment.tz.names();
  if(checkdateformat == false){
    console.log("heyyyyyyyyy its an invalid format ")
    response.status(422).json({"error":"Invalid date format","message":"please pass YYYY-MM-DD HH:mm:ss date format"})
    return;
  }
  var found = currentUserTimezone.filter(function(item) { return item === timezone; });

console.log('found', found[0]);
if(found[0] != timezone){
    console.log("hey it does not exist")
    response.status(422).json({"error":"Invalid timezone","message":"please enter a valid timezone "})
    return;
}
   
      response.status(200).json({"date":checked_date,"timezone":timezone})
      return

   
});
