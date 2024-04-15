import { createContext, useContext, useMemo, useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const ProductContext = createContext();

// Get program key
const PROGRAM_KEY = new PublicKey(idl.metadata.address);

export const useProduct = () => {
	const context = useContext(ProductContext);

	if (!context) {
		throw new Error("Parent must be wrapped inside ProductProvider");
	}

	return context;
}

export const ProductProvider = ({ children }) => {

	const [user, setUser] = useState();
	const [userProductId, setUserProductId] = useState(0);
	const [transactionPending, setTransactionPending] = useState(false);

	const anchorWallet = useAnchorWallet();
	const { connection } = useConnection();
	const { publicKey, connected } = useWallet();

	const program = useMemo(() => {
		if (anchorWallet) {
			const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions);
			return new anchor.Program(idl, PROGRAM_KEY, provider);
		}
	}, [connection, anchorWallet])
	
	useEffect(() => {
		const start = async () => {
			console.log(connected);
			if (program && publicKey) {
				try {
					const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
					const user = await program.account.userAccount.fetch(userPda);
					console.log(user.productId);
					if (user) {
						setUser(user);
						setUserProductId(user.product_id);
					}
				} catch(err) {
					console.log("No user");

				} finally {

				}
			}
		}

		start()
	}, [program, publicKey, transactionPending])

	const registerUser = async (role, certUrl) => {
		if (program && publicKey) {
			try {
				setTransactionPending(true);
				const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);

				await program.methods
				.initUser(role, certUrl)
				.accounts({
					userAccount: userPda,
					authority: publicKey,
					SystemProgram: SystemProgram.programId
				})
				.rpc()

			} catch (err) {
				console.log(err);

			} finally {
				setTransactionPending(false);
			}
		}
	}

	const createProduct = async ( productName ) => {
		if (program && publicKey) {
			setTransactionPending(true);

			try {
				setTransactionPending(true);
				const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
				const [productPda] = await findProgramAddressSync([utf8.encode('product'), publicKey.toBuffer(), Uint8Array.from([userProductId])], program.programId);

				await program.methods
				.createProduct(productName)
				.accounts({
					productAccount: productPda,
					userAccount: userPda,
					authority: publicKey,
					SystemProgram: SystemProgram.programId
				}).rpc()

			} catch (err) {
				console.log(err);
			} finally {
				setTransactionPending(false);
			}
		}
	}


	return (
		<ProductContext.Provider
			value = {{
				user,
				connected,
				transactionPending,
				registerUser,
				createProduct
			}}
		>

			{children}
		</ProductContext.Provider>
	)
}