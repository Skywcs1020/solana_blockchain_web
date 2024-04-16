import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewPage.css";
import { useParams } from "react-router-dom";
import { useProduct } from "../../contexts/Product";


const ViewPage = () => {

	const [data, setData] = useState();
	const { id } = useParams();
	const { allProduct } = useProduct();

  return (
    <center>
      <div className="view">
        <h4>Lion Custard Powder</h4>
        <h4>Product ID: 7495</h4>

        <center className="container">
          
        </center>
      </div>
    </center>
  );
}

export default ViewPage;
