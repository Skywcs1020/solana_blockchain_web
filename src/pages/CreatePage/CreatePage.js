import React, { useEffect, useState } from "react";

import "./CreatePage.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProduct } from "../../contexts/Product"

const CreatePage = () => {
    const [name, setName] = useState("");
    const { connected, publicKey } = useWallet();
		const { createProduct, newProduct, setNewProduct } = useProduct();

    const handleSubmit = async (e) => {
        e.preventDefault();

				createProduct(name);
    };

		useEffect(() => {
			setNewProduct("");
		}, [])

    return (
        <div className="create">
					{newProduct != "" ? (
						<div style={{ padding: "20px", textAlign: "center" }}>
							The new product is created and the assigned ID is <b>{newProduct}</b>
						</div>
					) : (
            <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
                <h4>Create a product</h4>

                <label>Product Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    disabled={!connected}
                    className={connected ? "enabledButton" : "disabledButton"}>
                    Submit
                </button>
            </form>
					)}
        </div>
    );
};

export default CreatePage;
