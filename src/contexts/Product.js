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
	const [newProduct, setNewProduct] = useState("");
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [allProduct, setAllProduct] = useState([]);

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
			if (program && publicKey) {
				try {
					const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
					const user = await program.account.userAccount.fetch(userPda);
					if (user) {
						setUser(user);
						setUserProductId(user.productId);
						console.log(user)
						
						const productAccounts = await program.account.productAccount.all();
						setAllProduct(productAccounts);
						console.log(productAccounts);
					}
				} catch(err) {
					console.log("No user");

				} finally {

				}
			}
		}

		start()
	}, [program, publicKey, transactionPending])

	const registerUser = async ( role, certUrl ) => {
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
				
				if (typeof productPda.toString() == "string") {
					setNewProduct(productPda.toString());
				}

			} catch (err) {
				console.log(err);
			} finally {
				setTransactionPending(false);
			}
		}
	}

	const addRecord = async ( productId, location, next_owner, certUrl ) => {
		if (program && publicKey) {
			try {
				setTransactionPending(true);

				console.log("running add record");

				const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
				const productPda = new PublicKey(productId);
				const nextOwnerPda = new PublicKey(next_owner);

				await program.methods
				.addRecord(location, nextOwnerPda, certUrl)
				.accounts({
					productAccount: productPda,
					userAccount: userPda,
					authority: publicKey,
					SystemProgram: SystemProgram.programId
				}).rpc()

				setUpdateSuccess(true);

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
				newProduct,
				updateSuccess,
				allProduct,
				setNewProduct,
				setUpdateSuccess,
				registerUser,
				createProduct,
				addRecord,
			}}
		>

			{children}
		</ProductContext.Provider>
	)
}