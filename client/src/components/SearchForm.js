import React from "react";
import { Link, Route, Router } from 'react-router-dom';
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "./style.css";

const SearchForm = ({
  history,
  properties,
  postalCode,
  minTaxAmt,
  maxTaxAmt,
  minMktTtlValue,
  maxMktTtlValue,
  maxBeds,
  maxBathsTotal,
  onSubmit,
  onChange,
  errors
}) => {
  return (
    <div className="loginBox">
      <h1>Universal Home Finder</h1>
      <h2>Property Search!</h2>

      <form onSubmit={onSubmit}>
        <TextField
          name="postalCode"
          floatingLabelText="Postal Code:"
          value={postalCode}
          onChange={onChange}
        />
        <br/>
        <TextField
          name="minTaxAmt"
          floatingLabelText="Property Tax Min:"
          value={minTaxAmt}
          onChange={onChange}
        />
        <br/>
        <TextField
          name="maxTaxAmt"
          floatingLabelText="Property Tax Max:"
          value={maxTaxAmt}
          onChange={onChange}
        />
        <br/>
        <TextField
          name="minMktTtlValue"
          floatingLabelText="Market Price Min:"
          value={minMktTtlValue}
          onChange={onChange}
        />        
        <br/>
        <TextField
          name="maxMktTtlValue"
          floatingLabelText="Market Price Max:"
          value={maxMktTtlValue}
          onChange={onChange}
        />
        <br/>
        <TextField
          name="maxBeds"
          floatingLabelText="Beds:"
          value={maxBeds}
          onChange={onChange}
        />
                <br/>
        <TextField
          name="maxBathsTotal"
          floatingLabelText="Baths:"
          value={maxBathsTotal}
          onChange={onChange}
        />
        <br />
        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="search"
        />
      </form>
    </div>
  );
};

export default SearchForm;