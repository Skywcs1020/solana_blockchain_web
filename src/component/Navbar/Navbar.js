import React from "react";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>Dchain</h2>
      </Link>

			<WalletMultiButton className="walletButton"/>
    </header>
  );
}

export default Navbar;
