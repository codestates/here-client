import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

axios.defaults.withCredentials = true;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: "",
		};
		this.handleInputValue = this.handleInputValue.bind(this);
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleLogin = () => {
		const { email, password } = this.state;
		if (!email && !password) {
			this.setState({ errorMessage: "이메일과 비밀번호를 입력하세요" });
			return;
		}

		return axios
			.post("http://18.223.115.35:3000/signin", {
				email,
				password,
			})
			.then(() => this.props.handleResponseSuccess())
			.catch(err => {
				alert("이메일과 비밀번호를 다시 확인해주세요.");
				throw err;
			});
	};

	render() {
		return (
			<div>
				<center>
					<img
						className={styles.logo}
						src="https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"
						alt="HERE"
					/>
					<h1 className={styles.title}>맛에 진심인 사람들, 여기지!</h1>

					<h1>Login</h1>
					<form onSubmit={e => e.preventDefault()}>
						<div>
							<input
								type="email"
								placeholder="이메일을 입력해 주세요"
								onChange={this.handleInputValue("email")}
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="비밀번호를 입력 해주세요"
								onChange={this.handleInputValue("password")}></input>
						</div>
						<div>
							<Link to="/signup">아직 아이디가 없으신가요?</Link>
						</div>
						<button type="submit">
							<Link to="/main">Login</Link>
						</button>
						{<div className="alert-box">{this.state.errorMessage}</div>}
					</form>
				</center>
			</div>
		);
	}
}

export default Login;
