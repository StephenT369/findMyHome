import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SearchForm from "./SearchForm.js";
//const axios = require("axios");
require("dotenv").config();
var axios = require("axios");
axios.default.defaults.headers.common["apikey"] = '4c0b6b2cba6a096ddb09064a579ab77e';
axios.default.defaults.headers.common["Accept"] = 'application/json';
var Zillow = require("node-zillow");
var zApi = new Zillow("X1-ZWz1hghtx31b0r_47pen");
class SearchContainer extends Component{

constructor(props){
   super(props);
   this.state ={
       errors: {},
    properties: {
        postalCode: "",
        minTaxAmt: "",
        maxTaxAmt: "",
        minMktTtlValue: "",
        maxMktTtlValue: "",
        maxBeds: "",
        maxBathsTotal: ""
    }
    };

    this.submitSearch = this.submitSearch.bind(this);
   };

submitSearch(event){
    event.preventDefault();
    
    var postalCode = 75032; //this.state.properties.postalCode;
    var minTaxAmt = 1000; //this.state.properties.minTaxAmt;
    var maxTaxAmt = 3000; //this.state.properties.maxTaxAmt;
    var minMktTtlValue = 200000; //this.state.properties.minMktTtlValue;
    var maxMktTtlValue = 300000; //this.state.properties.maxMktTtlValue;
    var maxBeds = 4 //this.state.properties.maxBeds;
    var maxBathsTotal = 3// this.state.properties.maxBathsTotal;

    var attomUrl =
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/assessment/detail?" +
    "postalcode=" +
    postalCode +
    "&pagesize=21" +
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
          console.log('****Address****')
          console.log(results.response.address.street[0]);
          console.log(results.response.address.city[0]);
          console.log(results.response.address.state[0]);
          console.log(results.response.address.zipcode[0]+'\n\n');
          console.log('****Details****')
          console.log('year Built: '+results.response.editedFacts.yearBuilt[0] );
          console.log('living sqft: '+results.response.editedFacts.finishedSqFt[0] );
          console.log('lot sqft: '+results.response.editedFacts.lotSizeSqFt[0] );
          console.log('bedrooms: '+results.response.editedFacts.bedrooms[0]);
          console.log('bathrooms: '+results.response.editedFacts.bathrooms[0]);
          console.log('description:\n' + results.response.homeDescription);
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
};
};

render(){
    return(
        <div>
            <SearchForm
            onSubmit={this.submitSearch}
            />
        </div>
    );
};
};
export default SearchContainer;