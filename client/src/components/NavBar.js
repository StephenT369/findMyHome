import React, {useState} from "react";
import "./Search.css";
import Zillowlogo from "../assets/images/Zillowlogo.gif";
import {Link} from 'react-router-dom';


function Search() {
  const [zipCode, setZipCode] = useState(0)
  const [price, setPrice] = useState('');
  

  function handleZipcode(event) {
    setZipCode(event.target.value);
  }

  function handlePropetyTax() {
    // API.get('/search?params...')
  }

  function handlePrice(event) {
    const price = event.target.innerText
    setPrice(price)

   // API.get(`/search?price=${price}&zipCode=${zipCode}`)

  }

  return (
    // <!-- sidebar -->
    <>

<div className="sidebar">
<a  id="sidebar-heading" href="blank.html">Information</a>

<br></br>
  <a target="_blank" id="sidebar-menu" href="https://broadbandnow.com/Texas">Internet Providers</a>
  <br></br>
  <a target="_blank" id="sidebar-menu"  href="https://gisit.tarrantcounty.com/cmportal/">Crime</a>
  <br></br>
  <a target="_blank" id="sidebar-menu"  href="https://www.niche.com/k12/search/best-school-districts/m/dallas-fort-worth-metro-area/">School Districts</a>
  <br></br>
  
  
</div>

{/* <!-- Page content --> */}
{/* <div class="main">
  ...
</div>
      <div className="sidebar">
        <a className="active" href="client\src\Uhflogo.png">
          
        </a>
        <a href="https://gisit.tarrantcounty.com/cmportal/">
          Check Crime in your area.
        </a>
        <a className="intPro" href="https://broadbandnow.com/Texas">
          Search for Internet Provider.
        </a>
      </div> */}

    

      <div className="bgimg display-container animate-opacity text-white">
        <h1>Universal Home Finder</h1>
        <div id="addQuestion">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="Search"
                placeholder="Zip Code"
                aria-label="Search"
                onChange={handleZipcode}
                id="searchZipCode"
              />
            </form>

            <div className="btn-group">
              <button
                // type="button"
                className="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Price
              </button>
              <div className="dropdown-menu">

                <Link className="dropdown-item" to="/Price" onClick={handlePrice}>
                  $100K - $150K
                </Link>
                <Link className="dropdown-item" to="/Price">
                  $151K - $250K
                </Link>
                <Link className="dropdown-item" to="/Price">
                  $251K - $3500K
                </Link>
                <Link className="dropdown-item" to="/Price">
                  $351K - $450K
                </Link>
                <Link className="dropdown-item" to="/Price">
                  $451K - $550K
                </Link>
                <div className="dropdown-divider"></div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Property Tax
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/PropertyTax?minTaxAmt=500&maxTaxAmt=1000">
                  $500-1000
                </Link>
                <Link className="dropdown-item" to="/PropertyTax?minTaxAmt=1001&maxTaxAmt=2000">
                $1001-2000
                </Link>
                <Link className="dropdown-item" to="/PropertyTax?minTaxAmt=2001&maxTaxAmt=3000">
                $2001-3000
                </Link>
                <Link className="dropdown-item" to="/PropertyTax?minTaxAmt=3001&maxTaxAmt=4000">
                $3001-4000
                </Link>
                <Link className="dropdown-item" to="/PropertyTax?minTaxAmt=4001&maxTaxAmt=5000">
                $4001-5000
                </Link>
                <div className="dropdown-divider"></div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Bed
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/Bed">
                  1
                </Link>
                <Link className="dropdown-item" to="/Bed">
                  2
                </Link>
                <Link className="dropdown-item" to="/Bed">
                  3
                </Link>
                <Link className="dropdown-item" to="/Bed">
                  4+
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="topleftimg">
          <img src={Zillowlogo} alt="logo" />
        </div>
      </div>
    </>
  );
}

export default Search;