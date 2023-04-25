import {
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import "./app.css";
import app from "./firebase/firebase.init";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const GitProvider = new GithubAuthProvider();
function App() {
	const [loginUser, setloginUser] = useState(null);

	const SignInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => setloginUser(result.user))
			.catch((error) => console.log(error));
	};
	const SignInWithGithub = () => {
		signInWithPopup(auth, GitProvider)
			.then((result) => setloginUser(result.user))
			.catch((error) => console.log(error));
	};

	const googleSignOut = () => {
		signOut(auth).then(setloginUser(null));
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
			This is firebase Authintecation practice
			<br />
			{loginUser && <h3>{loginUser.displayName}</h3>}
			<br />
			<button className="mr-4 text-green-500" onClick={SignInWithGoogle}>
				Google Sign In
			</button>
			<button className="mr-4 text-yellow-400" onClick={SignInWithGithub}>
				Github Sign In
			</button>
			{loginUser && (
				<button className="text-red-600" onClick={googleSignOut}>
					Sign out
				</button>
			)}
		</div>
	);
}

export default App;
