require("dotenv").config();
var axios = require("axios");
axios.default.defaults.headers.common["apikey"] = process.env.apikey;
axios.default.defaults.headers.common["Accept"] = process.env.Accept;
var Zillow = require("node-zillow");
var zApi = new Zillow(process.env.ZWSID);
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // passport login post
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("hello you just logged in!");
    res.json(req.user);
  });

  //Create user from signup form
  app.post("/api/signup", function(req, res) {
    //return res.json;
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        //history.push('/login');
        
        res.redirect("/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    //console.log(req.body);
  });

  ///API search
  app.get("/search", function(req, res) {
    var postalCode = req.query.postalCode;
    var pageSize = 21;
    var minTaxAmt = req.query.minTaxAmt;
    var maxTaxAmt = req.query.maxTaxAmt;
    var minMktTtlValue = req.query.minMktTtlValue;
    var maxMktTtlValue = req.query.maxMktTtlValue;
    var maxBeds = req.query.maxBeds;
    var maxBathsTotal = req.query.maxBathsTotal;

    function searchProperties(
      postalCode,
      minTaxAmt,
      maxTaxAmt,
      minMktTtlValue,
      maxMktTtlValue,
      maxBeds,
      maxBathsTotal
    ) {
      attomUrl =
        "https://api.gateway.attomdata.com/propertyapi/v1.0.0/assessment/detail?" +
        "postalcode=" +
        postalCode +
        "&pagesize=" +
        pageSize +
        "&propertytype=SFR" +
        "&minTaxAmt=" +
        minTaxAmt +
        "&maxTaxAmt=" +
        maxTaxAmt +
        "&minMktTtlValue=" +
        minMktTtlValue +
        "&maxMktTtlValue=" +
        maxMktTtlValue +
        "&maxBeds=" +
        maxBeds +
        "&maxBathsTotal=" +
        maxBathsTotal;

      axios.default
        .get(attomUrl)
        .then(function(response) {
          var data = response.data.property;
          var address = [];

          for (let i = 0; i < data.length; i++) {
            address.push(data[i].address.line1);
          }
          return address;
        })
        .catch(function(error) {
          if (error.response) {
            console.log("RESPONSE ERROR: ", error.message);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("REQUEST ERROR: ", error.message);
          }
          console.log(error.config);
        })
        .then(async address => {
          for (let i = 0; i < address.length; i++) {
            var parms = {
              address: address[i],
              citystatezip: postalCode
            };
            const zillowData = await getZillowData(parms, address[i]);
          }
        });

      function getZillowData(parms, address) {
        return zApi
          .get("GetDeepSearchResults", parms, address)
          .then(function(results) {
            var zpid = results.response.results.result[0].zpid;

            return zpid;
          })
          .then(function(zpid) {
            zApi
              .get("GetUpdatedPropertyDetails", { zpid: zpid })
              .then(function(results) {
                var images = results.response.images.image[0].url;
                console.log("\n\n----PROPERTY----");
                //console.log(address);
                console.log("****Address****");
                console.log(results.response.address.street[0]);
                console.log(results.response.address.city[0]);
                console.log(results.response.address.state[0]);
                console.log(results.response.address.zipcode[0] + "\n\n");
                console.log("****Details****");
                console.log(
                  "year Built: " + results.response.editedFacts.yearBuilt[0]
                );
                console.log(
                  "living sqft: " + results.response.editedFacts.finishedSqFt[0]
                );
                console.log(
                  "lot sqft: " + results.response.editedFacts.lotSizeSqFt[0]
                );
                console.log(
                  "bedrooms: " + results.response.editedFacts.bedrooms[0]
                );
                console.log(
                  "bathrooms: " + results.response.editedFacts.bathrooms[0]
                );
                console.log(
                  "description:\n" + results.response.homeDescription
                );
                console.log(images);
                //loop through image array if we need it.
                /*for (let i = 0; i < images[i].length; i++) {
            console.log(images[i]);
          };*/
                console.log(results.response.links);
                console.log("----PROPERTY----");
                /*console.log("****ZILLOW WHOLE RESPONSE****");
          console.log(results)*/
                return results.response;
              });
          });
      }
    }
    searchProperties(
      postalCode,
      minTaxAmt,
      maxTaxAmt,
      minMktTtlValue,
      maxMktTtlValue,
      maxBeds,
      maxBathsTotal
    );
  });
};
