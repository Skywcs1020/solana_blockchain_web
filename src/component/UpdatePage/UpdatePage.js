import React, { useState } from "react";
import axios from "axios";

import "./UpdatePage.css";

const UpdatePage = () => {
  const [id, setID] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [nextOwner, setNextOwner] = useState("");
  const [mode, setMode] = useState("Air");
	const [file, setFile] = useState(null);

	// const retrieveFile = (e) => {

	// 	const data = e.target.files[0];
	// 	const reader = new window.FileReader();
	// 	reader.readAsArrayBuffer(data);
	// 	reader.onloadend = ()=> {
	// 		setFile(Buffer(reader.result));
	// 	}

	// 	e.preventDefault();
	// }

	const handleSubmit = async (e) => {

		e.preventDefault();

		try {
			const fileData = new FormData();
			fileData.append("file", file);

			console.log(process.env.REACT_APP_PINATA_API_KEY);

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
        <label>Product ID</label>
        <input
          type="text"
          required
          value={id}
          onChange={(e) => setID(e.target.value)}
        />

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

        <label>Mode of shipment</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="Air">Air</option>
          <option value="Ocean">Ocean</option>
          <option value="Road">Road</option>
          <option value="Rail">Rail</option>
        </select>

				<label>Certificates</label>
				<input type="file" name="data" onChange={(e) => setFile(e.target.files[0])}/>
        {/* <UploadDropzone
          uploader={uploader}
          options={options}
          onUpdate={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
          width="600px"
          height="375px"
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdatePage;
