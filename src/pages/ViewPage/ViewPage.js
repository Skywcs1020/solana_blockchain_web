import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts/Product";
import { useParams } from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
		MDBCardSubTitle,
		MDBCardLink,
} from "mdb-react-ui-kit";

import "./ViewPage.css";


const ViewPage = () => {

	const [data, setData] = useState(null);
	const { productId } = useParams();
	const { allProduct } = useProduct();

	useEffect(() => {
		const temp = allProduct.find(product => product.publicKey.toString() == productId);

		setData(temp);

	}, []) 


  return (
    <center>
			{!data ? (
				<div style={{ padding: "20px" }}>
					<h5>Product not found</h5>
				</div>
			) : (
				<div className="view">
					<h2 style={{ color: "#E6AF2E"}}>{data.account.productName}</h2>
					<h6>Product ID: <b>{data.publicKey.toString()}</b></h6>
					<h6>Origin: <b>{data.account.organization}</b></h6>
					<h6>Record Count: <b>{data.account.recordCount}</b></h6>
	
					<center>
						{
							data.account.record.map((records) => {
								return (
									<div className='border rounded-7 m-3' id="recordBlock">
										<p>Author: {records.role} </p>
										<p>Location: {records.location}</p>
										<a href={records.certificate} target="_blank">Click to view the certificate</a>
									</div>
								)})
						}
					</center>
				</div>
			)}
    </center>
  );
}

export default ViewPage;
