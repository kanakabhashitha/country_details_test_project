import React from "react";

import Navbar from "react-bootstrap/Navbar";
import "../App.css";

function Header(props) {
  return (
    <div>
      <Navbar bg="dark" style={{ marginBottom: 50 }}>
        <div className="container">
          <Navbar.Brand href="#home">
            <img
              src="https://icon-library.com/images/country-icon/country-icon-5.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top rotate"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <h2 style={{ color: "red" }}>Country Details</h2>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
