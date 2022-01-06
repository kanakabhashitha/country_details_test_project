import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import CountryTable from "./components/CountryTable";
import Header from "./components/Header";

function App() {
  return (
    <div className="content">
      <Header />
      <CountryTable />
    </div>
  );
}

export default App;
