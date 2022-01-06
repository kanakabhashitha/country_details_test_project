import React, { useState, useEffect } from "react";

import "../App.css";
import Alert from "react-bootstrap/Alert";

function CountryTable(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [cImgUri, setcImgUri] = useState(0);

  const getData = () => {
    fetch("data.json", {
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
        console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //set useState
  const handleClick = (state, url) => () => {
    setShow(state);
    setcImgUri(url);
  };

  //diaplay aleart
  if (show) {
    return (
      <Alert
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
    );
  }
  return (
    <table className="container table table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Country Name</th>
          <th scope="col">Currency</th>
          <th scope="col">Population</th>
          <th scope="col">GDP</th>
          <th scope="col">Flag</th>
          <th scope="col">FlagURI</th>
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
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
