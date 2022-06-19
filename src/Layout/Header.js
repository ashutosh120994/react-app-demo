import React from "react";
import { Row } from "react-materialize";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";

const Header = props => {

  return (
    <div>
      <Row>
        <Navbar />
      </Row>
    </div>
  );
};

export default Header;
