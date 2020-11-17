import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";
import "../../modal.css";
//import { render } from "react-dom";

axios.defaults.withCredentials = true;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: "",
		};
	}

	handleInputValue = key => event => {
		if (event.currentTarget === null) {
			return;
		}
		event.preventDefault();
		this.setState({ [key]: event.currentTarget.value });
	};

	handleLogin = () => {
		const { email, password } = this.state;
		console.log(email);
		console.log(password);
		if (!email || !password) {
			this.setState({ errorMessage: "이메일과 비밀번호를 입력하세요" });
			return;
		}
		const data = { email, password };
		const fetch = require("node-fetch");
		fetch("http://localhost:5000/users/signin", {
			method: "POST", // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json",
			},
		})
			// .then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.then(() => {
				console.log("로그인 성공!", data);
				this.props.handleSignIn();
			})
			.catch(error => console.error("Error:", error));

		// return axios
		// 	.post("http://18.223.115.35:3000/users/signin", {
		// 		email,
		// 		password,
		// 	})
		// 	.then(data => {
		// 		console.log("로그인 성공!", data);
		// 		this.props.handleSignIn();
		// 	})
		// 	.catch(err => {
		// 		alert("이메일과 비밀번호를 다시 확인해주세요.");
		// 		console.dir(err);
		// 		throw err;
		// 	});
	};

	render() {
		return (
			<div>
				<center classname={styles.loginCenter}>
					<img
						className={styles.logo}
						src="https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"
						alt="HERE"
					/>
					<h1 className={styles.title}>
						맛에 진심인 사람들,
						<br />
						여기지!
					</h1>

					<form className={styles.inputForm} onSubmit={e => e.preventDefault()}>
						<div>
							<input
								className={styles.input}
								type="email"
								placeholder="이메일을 입력해 주세요"
								onChange={this.handleInputValue("email")}
							/>
						</div>
						<div>
							<input
								className={styles.input}
								type="password"
								placeholder="비밀번호를 입력 해주세요"
								onChange={this.handleInputValue("password")}
							/>
						</div>
						<div>
							<Link to="/signup">아직 아이디가 없으신가요?</Link>
						</div>
						<button type="submit" onClick={this.handleLogin}>
							Login
						</button>
						{<div className="alert-box">{this.state.errorMessage}</div>}
					</form>
				</center>
			</div>
		);
	}
}

export default Login;
