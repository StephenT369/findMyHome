import React, {useState} from "react";
import "../assets/css/Search.css";
import zillowLogo from "../assets/images/Zillowlogo.gif";
import {Link} from 'react-router-dom';
import { ActionPictureInPicture } from "material-ui/svg-icons";

class Search extends React.Component {
  state = {properties :[]};
  
  onTermSubmit = async term => {
    const response = await searchProperties(
      postalCode,
      minTaxAmt,
      maxTaxAmt,
      minMktTtlValue,
      maxMktTtlValue,
      maxBeds,
      maxBathsTotal
    )

    {
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

  }
  
  
}

export default Search;