import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

import "./UpdatePage.css";
import { useWallet } from "@solana/wallet-adapter-react";

const UpdatePage = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [nextOwner, setNextOwner] = useState("");
	const [file, setFile] = useState(null);
	const { connected } = useWallet();


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
			console.log(fileUrl)
		} catch (error) {
			console.log(error.message);
		}
	}

  return (
    <div className="create">
      <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
        <h4>Update a new record</h4>

        <label>Organization Name</label>
        <input
          type="text"
          required
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
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
    </div>
  );
}

export default UpdatePage;
