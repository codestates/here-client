import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import styles from "./signup.module.css";
import DaumPostCode from "react-daum-postcode";

axios.defaults.withCredentials = true;
//axios.baseURL = "https://soltylink.com";

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			mobile: "",
			password: "",
			confirmpassword: "",
			errorMessage: "",
			location: "",
			isdaumpost: false,
			isRegister: false,
			register: [],
		};
	}
	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleOpen = () => {
		this.setState({
			isdaumpost: true,
		});
	};

	handleLocation = data => {
		let AllAddress = data.address;
		let extraAddress = "";

		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}
		this.setState({
			location: AllAddress,
		});
	};

	handleSignup = e => {
		e.preventDefault();
		const {
			name,
			email,
			mobile,
			location,
			password,
			confirmpassword,
		} = this.state;

		const data = {
			name,
			email,
			mobile,
			location,
			password,
		};

		console.log("==== 밥 먹기전 테스트! ===== 보내기전====", data);
		let tmpEmail = email.split(""),
			invalidEmail = true;
		if (tmpEmail.filter(x => x === "@" || x === ".").length === 2) {
			invalidEmail = false;
		}

		// first, check valid email. And then check all input stuffs such as name, mobile and password.
		if (invalidEmail) {
			this.setState({ errorMessage: "잘못된 이메일 주소입니다." });
		}

		if (!name || !password) {
			this.setState({ errorMessage: "모든 항목 필수" });
			if (password !== confirmpassword) {
				this.setState({ errorMessage: "비밀번호가 일치하지 않습니다." });
				return;
			}
		} else {
			let tmpMobile;
			if (
				mobile.length === 8 &&
				mobile.split("").every(x => !isNaN(Number(x)))
			) {
				tmpMobile = "010" + mobile;
			} else if (mobile.length < 8 || mobile.length > 13) {
				this.setState({ errorMessage: "잘못된 전화번호입니다." });
			} else {
				if (mobile.split("").includes("-")) {
					tmpMobile = mobile.split("-").join("");
				}
			}
			data.mobile = tmpMobile;

			axios
				.post("https://soltylink.com/users/signup", data)
				.then(response => {
					console.log("statusCode 찾기용 전체: ", response);
					alert("성공적으로 가입이 완료되었습니다!");
					this.props.history.push("/");
				})
				.catch(err => {
					if (err.response.status === 409) {
						alert("이미 존재하는 이메일입니다.");
						//console.log("email", err.response.email);
					}
					console.dir(err);
					throw err;
				});
		}

		// const fetch = require("node-fetch");
		// fetch("http://18.223.115.35:3000/users/signup", {
		// 	method: "POST", // or 'PUT'
		// 	body: JSON.stringify(data), // data can be `string` or {object}!
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// })
		// 	.then(res => res.json())
		// 	.then(response => console.log("Success:", JSON.stringify(response)))
		// 	.catch(error => console.error("Error:", error));
	};

	render() {
		const { isdaumpost, location } = this.state;
		const width = 595;
		const height = 450;
		const modalStyle = {
			position: "absolute",
			top: 200,
			left: "-45px",
			zIndex: "100",
			border: "1px solid #000000",
			overflow: "hidden",
		};
		return (
			<div>
				<center className={styles.signupCenter}>
					<img src="/images/main/logo_img_small.jpg" alt="img" />
					<h1>Sign Up</h1>
					<form className={styles.inputForm} onSubmit={e => e.preventDefault()}>
						<div>
							<input
								className={styles.name}
								type="name"
								onChange={this.handleInputValue("name")}
								placeholder="이름"
							/>
						</div>
						<div>
							<input
								className={styles.email}
								type="email"
								placeholder="이메일을 입력 해주세요"
								onChange={this.handleInputValue("email")}
							/>
						</div>
						<div>
							<input
								className={styles.mobile}
								type="mobile"
								onChange={this.handleInputValue("mobile")}
								placeholder="전화번호"
							/>
						</div>
						<div>
							<input
								className={styles.location}
								type="location"
								placeholder="선호하는 지역"
								value={location}
								onChange={this.handleInputValue("location")}
								onClick={this.handleOpen}
								onFocus={this.handleOpen}
							/>
						</div>
						{isdaumpost ? (
							<DaumPostCode
								onComplete={this.handleLocation}
								autoClose
								width={width}
								height={height}
								style={modalStyle}
								isdaumpost={isdaumpost.toString()}
							/>
						) : null}
						<div>
							<input
								className={styles.password}
								onChange={this.handleInputValue("password")}
								type="password"
								placeholder="비밀번호를 입력 해주세요"
							/>
						</div>
						<div>
							<input
								onChange={this.handleInputValue("confirmpassword")}
								type="password"
								placeholder="비밀번호를 확인을 위해 한번 더 입력 해주세요"
							/>
						</div>
						{this.state.errorMessage ? (
							<div className={styles.error}>{this.state.errorMessage}</div>
						) : null}
						<button
							className={styles.button}
							type="submit"
							onClick={this.handleSignup}>
							확인
						</button>
					</form>
				</center>
			</div>
		);
	}
}

export default withRouter(Signup);
