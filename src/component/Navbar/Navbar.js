import React from "react";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useProduct } from "../../contexts/Product"
import "./Navbar.css";

const Navbar = () => {
	const { user, connected }  = useProduct();
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>Dchain</h2>
      </Link>

			<div className="userField">
				{connected? (user ? <h5>{user.role}</h5> : <h5>Not registered</h5>) : <div></div>}
				<WalletMultiButton className="walletButton"/>
			</div>
    </header>
  );
}

export default Navbar;
