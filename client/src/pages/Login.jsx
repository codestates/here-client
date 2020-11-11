import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();
	return (
		<div>
			<h1>Login</h1>
			<button
				onClick={() => {
					history.push("/");
				}}>
				HOME
			</button>
		</div>
	);
};

export default Login;
