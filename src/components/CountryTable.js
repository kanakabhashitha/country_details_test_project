import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

import "../App.css";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

function CountryTable(props) {
  //fetch api usestate
  const [data, setData] = useState([]);
  //alert usestate
  const [show, setShow] = useState(false);
  const [cImgUri, setcImgUri] = useState(0);
  //edit model usestate
  const [showModel, setShowModel] = useState(false);
  const [columnData, setColumnData] = useState([]);
  //add model usestate
  const [showAddModel, setShowAddModel] = useState(false);

  //set useState fro alert
  const handleClick = (state, url) => () => {
    setShow(state);
    setcImgUri(url);
  };

  //set use state for edit model
  const handleClose = () => setShowModel(false);
  const handelEdit =
    ([columnData]) =>
    () => {
      setShowModel(true);
      setColumnData(columnData);
    };

  //set use state for add model
  const handleCloseAddModel = () => setShowAddModel(false);
  const handelAdd = () => {
    setShowAddModel(true);
  };

  //delete item
  const handelDelete = (id) => () => {
    console.log(id);

    //conirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //fetch data
        fetch("http://localhost:3003/item/" + id, {
          method: "DELETE",
        }).then(() => {
          console.log("delete");
        });

        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          function () {
            window.location.reload();
          }
        );
      }
    });
  };

  //get data from json object
  const getData = () => {
    fetch("http://localhost:3003/item", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        //console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {/* alert box */}
      <Alert
        show={show}
        className="coutryAlert"
        variant="info"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>Click the Link & Copy URI</Alert.Heading>
        <a href={cImgUri} target="blank">
          View Country Flag
        </a>
      </Alert>

      {/* add button */}
      <div style={{ background: "#e6e6e6", margin: 20, padding: 10 }}>
        <Button onClick={handelAdd}>++ Add Country ++</Button>
      </div>

      <table className="container table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Country Name</th>
            <th scope="col">Currency</th>
            <th scope="col">Population</th>
            <th scope="col">GDP</th>
            <th scope="col">Flag</th>
            <th scope="col">FlagURI</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <tr key={item.id}>
                <td>
                  <h6>{item.countryName}</h6>
                </td>
                <td>
                  <h6>{item.currency}</h6>
                </td>
                <td>
                  <h6>{item.population}</h6>
                </td>
                <td>
                  <h6>{item.gdp}</h6>
                </td>
                <td>
                  <img
                    style={{ width: 100, height: 50 }}
                    src={item.flagUri}
                    alt="flagURI"
                  />
                </td>
                <td>
                  <img
                    onClick={handleClick(true, item.flagUri)}
                    src="https://icon-library.com/images/open-file-icon/open-file-icon-25.jpg"
                    alt="icon"
                  />
                </td>
                <td>
                  {/* edit button */}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handelEdit([item])}
                  >
                    <FontAwesomeIcon icon={faPen} color="black" />
                  </Button>

                  {/* delete button */}
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ marginLeft: 5 }}
                    onClick={handelDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* edit model  */}
      <Modal show={showModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Country Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm>{columnData}</EditForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* add model  */}
      <Modal show={showAddModel} onHide={handleCloseAddModel}>
        <Modal.Header closeButton>
          <Modal.Title>Add Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <DeleteItem id={deleteItem} /> */}
    </div>
  );
}

export default CountryTable;
