import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

function AddForm(props) {
  //useState for input feild
  const [countryName, setCountryName] = useState("");
  const [currency, setCurrency] = useState("");
  const [population, setPopulation] = useState("");
  const [flagUri, setFlagUri] = useState("");
  const [gdp, setDdp] = useState("");
  //const [data, setDate] = useState([]);

  //   const hadelClickSubmit = () => {
  //     const item = { countryName, currency, population, flagUri, gdp };

  //     // let item = [];

  //     // let unique_id = uuid();

  //     // item.push({
  //     //   id: unique_id,
  //     //   countryName: countryName,
  //     //   currency: currency,
  //     //   population: population,
  //     //   flagUri: flagUri,
  //     //   gdp: gdp,
  //     // });

  //     const reqestOption = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(item),
  //     };

  //     fetch("http://localhost:3000/item", reqestOption)
  //       .then(function (response) {
  //         //console.log(response);
  //         return response.json();
  //       })
  //       .then(function (myJson) {
  //         console.log(myJson);
  //         //setDate(myJson);
  //       });
  //   };

  //click submit the form
  const handelSubmit = (e) => {
    //e.preventDefault();

    //auto generated id
    const id = uuid();

    //bind all values to the item
    const item = { id, countryName, currency, population, flagUri, gdp };

    console.log(item);

    //featch all values
    fetch("http://localhost:3003/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    //success full alert
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div>
      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            type="text"
            value={countryName}
            placeholder="Enter Country Name"
            required="required"
            onChange={(e) => setCountryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCurrency">
          <Form.Label>Currency</Form.Label>
          <Form.Control
            type="text"
            value={currency}
            placeholder="Enter Country Currency"
            required="required"
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPopulation">
          <Form.Label>Population</Form.Label>
          <Form.Control
            type="text"
            value={population}
            placeholder="Enter Country Population"
            required="required"
            onChange={(e) => setPopulation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFlagUri">
          <Form.Label>Flag URI</Form.Label>
          <Form.Control
            type="text"
            value={flagUri}
            placeholder="Enter Country Flag URI"
            onChange={(e) => setFlagUri(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGdp">
          <Form.Label>GDP</Form.Label>
          <Form.Control
            type="text"
            value={gdp}
            placeholder="Enter Country GDP"
            required="required"
            onChange={(e) => setDdp(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddForm;
