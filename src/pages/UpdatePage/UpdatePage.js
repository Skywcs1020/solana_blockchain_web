import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../../contexts/Product";

import "./UpdatePage.css";

const UpdatePage = () => {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [nextOwner, setNextOwner] = useState("");
	const [file, setFile] = useState(null);
	const { connected, transactionPending, addRecord, setTransactionPending, updateSuccess, setUpdateSuccess } = useProduct();

	const handleSubmit = async (e) => {

		e.preventDefault();

		try {
			const fileData = new FormData();
			fileData.append("file", file);

			const responseData = await axios({
				method: "post",
				url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
				data: fileData,
				headers: {
					pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
					pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
					"Content-Type": "mulitpart/form-data",
				}
			});

			const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
			addRecord(id, address, nextOwner, fileUrl);
		} catch (error) {
			console.log(error.message);
		}
	}

		useEffect(() => {
            setUpdateSuccess(false);
        }, []);

  return (
    <div className="create">
			{updateSuccess ? (
				<div style={{ padding: "20px"}}>
					<h5>Update successfully!</h5>
					<h5><Link to={`/view/${id}`}>Click here</Link> to view the details</h5>
				</div>
			) : (
				<form style={{ padding: "20px" }} onSubmit={handleSubmit}>
					<h4>Update a new record</h4>
	
					<label>Product ID</label>
					<input
						type="text"
						required
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
	
					<label>Address</label>
					<textarea
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
	
					<label>Next owner</label>
					<input
						type="text"
						required
						value={nextOwner}
						onChange={(e) => setNextOwner(e.target.value)}
					/>
	
					<label>Certificates</label>
					<input type="file" name="data" onChange={(e) => setFile(e.target.files[0])} required/>
					<button disabled={ !connected } className={ connected ? "enabledButton" : "disabledButton"}>Submit</button>
				</form>
			)}
			</div>
  );
}

export default UpdatePage;
