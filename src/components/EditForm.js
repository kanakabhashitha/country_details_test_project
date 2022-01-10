import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function EditForm({ children }) {
  //useState for input fild
  const [id, setId] = useState(children.id);
  const [countryName, setCountryName] = useState(children.countryName);
  const [currency, setCurrency] = useState(children.currency);
  const [population, setPopulation] = useState(children.population);
  const [flagUri, setFlagUri] = useState(children.flagUri);
  const [gdp, setDdp] = useState(children.gdp);

  // const hadelClickSubmit = () => {
  //   let item = [];

  //   item.push({
  //     id: id,
  //     countryName: countryName,
  //     currency: currency,
  //     population: population,
  //     flagUri: flagUri,
  //     gdp: gdp,
  //   });

  //   const reqestOption = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   };

  //   fetch("http://localhost:3003/item?id:{id}", reqestOption)
  //     .then(function (response) {
  //       //console.log(response);
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson);
  //       setDate(myJson);
  //     });
  // };

  //click submit
  const handelSubmit = (e) => {
    e.preventDefault();

    //bind the data to the item
    const item = { id, countryName, currency, population, flagUri, gdp };

    console.log(item);

    //display confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //fetch data
        fetch("http://localhost:3003/item/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }).then(() => {
          console.log(item);
        });

        Swal.fire("Updated!", "Your file has been update.", "success").then(
          function () {
            window.location.reload();
          }
        );
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formCountryId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            value={id}
            readOnly="redOnly"
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            type="text"
            value={countryName}
            required="required"
            onChange={(e) => setCountryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCurrency">
          <Form.Label>Currency</Form.Label>
          <Form.Control
            type="text"
            value={currency}
            required="required"
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPopulation">
          <Form.Label>Population</Form.Label>
          <Form.Control
            type="text"
            value={population}
            required="required"
            onChange={(e) => setPopulation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFlagUri">
          <Form.Label>Flag URI</Form.Label>
          <Form.Control
            type="text"
            value={flagUri}
            onChange={(e) => setFlagUri(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGdp">
          <Form.Label>GDP</Form.Label>
          <Form.Control
            type="text"
            value={gdp}
            required="required"
            onChange={(e) => setDdp(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" style={{ width: "100%" }}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default EditForm;
