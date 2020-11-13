import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";
import "../../modal.css";

axios.defaults.withCredentials = true;

const Login = props => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const [signin, setSignin] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState();

	const handleInputValue = event => {
		if (event.currentTarget === null) {
			return;
		}
		event.preventDefault();
		setSignin({ [event.currentTarget.name]: event.currentTarget.value });
	};

	const { email, password } = signin;
	const handleLogin = () => {
		if (!email || !password) {
			setErrorMessage({ errorMessage: "이메일과 비밀번호를 입력하세요" });
			return;
		}

		return axios
			.post("http://18.223.115.35:3000/signin", {
				email,
				password,
			})
			.then(() => props.handleResponseSuccess())
			.catch(err => {
				alert("이메일과 비밀번호를 다시 확인해주세요.");
				throw err;
			});
	};

	return (
		<div>
			<center>
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

				<form onSubmit={e => e.preventDefault()}>
					<div>
						<input
							ref={emailRef}
							type="email"
							value={email}
							placeholder="이메일을 입력해 주세요"
							onChange={handleInputValue}
						/>
					</div>
					<div>
						<input
							ref={passwordRef}
							type="password"
							value={password}
							placeholder="비밀번호를 입력 해주세요"
							onChange={handleInputValue}></input>
					</div>
					<div>
						{/* <Link to="/signup">아직 아이디가 없으신가요?</Link> */}아직
						아이디가 없으신가요?
					</div>
					<button type="submit" onClick={handleLogin}>
						{/* <Link to="/main">Login</Link> */}Login
					</button>
					{<div className="alert-box">{errorMessage}</div>}
				</form>
			</center>
		</div>
	);
};

export default Login;
