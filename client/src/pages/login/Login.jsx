import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";
//import "../../modal.css";
//mport Axios from "axios";
//mport cookie from "react-cookies";
//import { render } from "react-dom";

axios.defaults.withCredentials = true;
//axios.baseURL = "https://soltylink.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: "",
			userInfo: {},
		};
	}

	handleInputValue = key => event => {
		if (event.currentTarget === null) {
			return;
		}
		event.preventDefault();
		this.setState({ [key]: event.currentTarget.value });
	};

	async handleLogin() {
		const { email, password } = this.state;
		console.log(email);
		console.log(password);
		if (!email || !password) {
			this.setState({ errorMessage: "이메일과 비밀번호를 입력하세요" });
			return;
		} else {
			//const data = { email, password };
			// const fetch = require("node-fetch");
			// fetch("http://18.223.115.35:3000/users/signin", {
			// 	method: "POST", // or 'PUT'
			// 	body: JSON.stringify(data), // data can be `string` or {object}!
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// })
			// 	// .then(res => res.json())
			// 	.then(response => console.log("Success:", JSON.stringify(response)))
			// 	.then(() => {
			// 		console.log("로그인 성공!", data);
			// 		this.props.handleSignIn();
			// 	})
			// 	.catch(error => console.error("Error:", error));
			// Axios({
			// 	method: "post",
			// 	headers: { "Content-Type": "application/x-www-form-urlencoded" },
			// 	url: "http://18.223.115.35:3000/users/signin",
			// 	data: email,
			// 	password,
			// })
			// 	.then(function (response) {
			// 		console.log(response.data);
			// 	})
			// 	.catch(err => {
			// 		console.dir(err);
			// 		throw err;
			// 	});

			// fetch('https://soltylink.com/users/signin', {
			//   method: 'POST', // or 'PUT'
			//   body: JSON.stringify({email:'aass@aass.com', password:'aass'}), // data can be `string` or {object}!
			//   credentials: "include",
			//   headers:{
			//     'Content-Type': 'application/json'
			//   }
			// }).then(data=>data.json()) //쿠키에 넣을때 stringify 해줘야함
			// .then(response => {console.log('Success:', response); document.cookie = `userInfo=${JSON.stringify(response)}`;})
			// .catch(error => console.error('Error:', error));
			console.log("업데이트4");
			await axios
				.post("https://soltylink.com/users/signin", {
					email,
					password,
				})
				.then(response => {
					//const userInfo = cookie.load("userInfo");
					if (response.status === 404) {
						alert("이메일과 비밀번호를 확인해주세요.");
						console.log("email", email);
					}
					console.log("status서방찾기:", response.status);
					console.log("로그인 성공!", response.data); //userInfo로 받아야하는 정보
					//document.cookie = `userInfo=${JSON.stringify(res.data)};
					//console.log(document.cookie);
					this.props.handleSignIn(response.data);
					//this.setState({ userInfo: userInfo });
					//console.log("signin하면 userInfo:", this.state.userInfo);
					//console.log("data Json=>>", userInfo);
				})
				.catch(err => {
					console.dir(err);
					throw err;
				});
		}
	}

	render() {
		return (
			<div>
				<center className={styles.loginCenter}>
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
						<div className={styles.atag}>
							<Link to="/signup">아직 아이디가 없으신가요?</Link>
						</div>
						<button
							type="submit"
							className={styles.button}
							onClick={this.handleLogin.bind(this)}>
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
