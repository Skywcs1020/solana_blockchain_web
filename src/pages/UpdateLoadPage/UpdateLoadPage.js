import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UpdateLoadPage.css";

const UpdateLoadPage = () => {
		const [address, setAddress] = useState();

    return (
        <center>
            <form style={{ padding: "20px" }}>
                <h4>Update new record</h4>
                <label>Product ID</label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="inputbox"
                />
            </form>

            <Link to={`/update/${address}`}>
                <div
                    style={{ width: "80px" }}
                    className="border rounded-3"
                    id="blockButton">
                    <h5>Enter</h5>
                </div>
            </Link>
        </center>
    );
};

export default UpdateLoadPage;