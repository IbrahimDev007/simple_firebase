import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useEffect } from "react";
import "./app.css";
import app from "./firebase/firebase.init";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
function App() {
	const SignInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => console.log(result.user))
			.then((error) => console.log(error));
	};
	useEffect(() => {
		const unsubscribe = () => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					console.log(user);
				}
			});
		};
		return () => unsubscribe();
	}, []);

	return (
		<div className="App">
			This is Google Authintecation
			<br />
			<br />
			<button style={{ marginRight: "20px" }} onClick={SignInWithGoogle}>
				Google Sign In
			</button>
			<button
				style={{ color: "red" }}
				onClick={() => signOut(auth).then(console.log("signout"))}
			>
				Sign out
			</button>
		</div>
	);
}

export default App;
