import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts/Product";
import "./ViewLoadPage.css";

const ViewLoadPage = () => {
	const [address, setAddress] = useState("");
	const { allProduct } = useProduct();

	// console.log(allProduct);

	return (
		<div className='create'>
      <form style={{ padding: "20px" }}>
        <h4>View a product record</h4>
        <label>Product ID </label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
			</form>

		<Link to={`/view/${address}`}>
			<button className='enterButton'>Submit</button>
		</Link>

		{
			allProduct.map((product) => {
				return (
					<div key={product.publicKey.toString()} className='p-1 border rounded-7 m-3' id="blockButton">
						<Link to={`/view/${product.publicKey.toString()}`}>
							<p>{product.account.productName}</p>
							<p>Origin: {product.account.organization}</p>
						</Link>
					</div>
				)})
		}
		</div>
	)
}

export default ViewLoadPage;