const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.static("public"));
const uri =
  "mongodb+srv://gv_22:gv_2228@cluster0.i70si.mongodb.net/testDB?retryWrites=true&w=majority";
try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}
const reportsSchema = {
  _id: String,
  timestamp: String,
  users: [String],
  marketID: String,
  marketName: String,
  cmdtyID: String,
  marketType: String,
  cmdtyName: String,
  priceUnit: String,
  price: Number,
  count: Number,
};

const Report = mongoose.model("Report", reportsSchema);

reportDetails = {
  /* userID: "user-1",
  marketID: "market-1",
  marketName: "Vashi Navi Mumbai",

  cmdtyID: "cmdty-1",
  marketType: "Mandi",
  cmdtyName: "Potato",
  priceUnit: "Pack",
  convFctr: 50,
  price: 700, */

  userID: "user-2",
  marketID: "market-1",
  marketName: "Vashi Navi Mumbai",
  cmdtyID: "cmdty-1",
  cmdtyName: "Potato",
  priceUnit: "Quintal",
  convFctr: 100,
  price: 1600,
};

app.post("/reports", (req, res) => {
  var t = Math.floor(new Date().getTime() / 1000);
  t = t.toString();
  var price = reportDetails.price / reportDetails.convFctr;
  var users = [reportDetails.userID];
  var newid = uuidv4();
  Report.findOne(
    { marketID: reportDetails.marketID, cmdtyID: reportDetails.cmdtyID },
    function (err, foundreport) {
      if (!err) {
        if (!foundreport) {
          const report = new Report({
            _id: newid,
            users: users,
            marketID: reportDetails.marketID,
            marketName: reportDetails.marketName,
            cmdtyID: reportDetails.cmdtyID,
            marketType: reportDetails.marketType,
            cmdtyName: reportDetails.cmdtyName,
            priceUnit: "kg",
            price: price,
            count: 1,
            timestamp: t,
          });

          report.save();
          console.log("added");
          res.send({ status: "success", reportID: newid });
        } else {
          foundreport.price =
            (foundreport.price * foundreport.count + price) /
            (foundreport.count + 1);
          foundreport.count = foundreport.count + 1;
          if (!foundreport.users.includes(users[0])) {
            foundreport.users.push(users[0]);
          }
          foundreport.save();
          res.send({ status: "success", reportID: foundreport._id });
        }
      } else {
        console.log("Error");
      }
    }
  );
});

app.get("/reports", (req, res) => {
  Report.findOne({ _id: req.query.reportID }, function (err, foundreport) {
    if (!err) {
      if (!foundreport) {
        res.send(
          "This is a GET request.Pls give a proper id query to get proper result.If you want to make a POST request, then edit get request in network tab to post request and resend"
        );
      } else {
        const data = {
          _id: foundreport._id,
          cmdtyName: foundreport.cmdtyName,
          cmdtyID: foundreport.cmdtyID,
          marketID: foundreport.marketID,
          marketName: foundreport.marketName,
          users: foundreport.users,
          timestamp: foundreport.timestamp,
          priceUnit: "Kg",
          price: foundreport.price,
        };
        res.send(data);
      }
    } else {
      console.log("Error");
    }
  });
});

app.listen(5000, console.log(`Server started on port 5000 `));
