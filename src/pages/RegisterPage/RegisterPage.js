import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader"

import "./RegisterPage.css";
import { useProduct } from "../../contexts/Product";

const RegisterPage = () => {
    const [organization, setOrganization] = useState("");
    const [file, setFile] = useState(null);
		const [fileUrl, setFileUrl] = useState("");
    const {
        user,
        connected,
        registerUser,
        transactionPending,
    } = useProduct();

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
                    pinata_secret_api_key:
                        process.env.REACT_APP_PINATA_SECRET_KEY,
                    "Content-Type": "mulitpart/form-data",
                },
            });

            const fileUrl =
                "https://gateway.pinata.cloud/ipfs/" +
                responseData.data.IpfsHash;
            setFileUrl(fileUrl);
						registerUser(organization, fileUrl);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="create">
            {!user ? (
                <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
                    <h4>Register an account</h4>

                    <label>Organization Name</label>
                    <input
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />

                    <label>Certificates</label>
                    <input
                        type="file"
                        name="data"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <button
                        disabled={!connected}
                        className={
                            connected ? "enabledButton" : "disabledButton"
                        }>
                        Submit
                    </button>
                </form>
            ) : ( transactionPending ? (
                <div style={{ padding: "20px" }}>
                    <PulseLoader color="#2c5875" />
                </div>
            ) : (
                <div style={{ padding: "20px" }}>
                    <h3>You have already registered an account</h3>
                </div>
            ))}
        </div>
    );
};

export default RegisterPage;
