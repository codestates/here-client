import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styles from "./signup.module.css";
import DaumPostCode from "react-daum-postcode";

axios.defaults.withCredentials = true;

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
			address: "",
			zoneCode: "",
			fullAddress: "",
			isDaumPost: false,
			isRegister: false,
			register: [],
		};
		this.handleInputValue = this.handleInputValue.bind(this);
	}
	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleOpen = () => {
		this.setState({
			isDaumPost: true,
		});
	};

	handleSignup = e => {
		e.preventDefault();
		const { name, email, mobile, password, confirmpassword } = this.state;

		const data = {
			name,
			email,
			mobile,
			password,
		};

		if (!name || !email || !mobile || !password) {
			this.setState({ errorMessage: "모든 항목 필수" });
			if (password !== confirmpassword) {
				this.setState({ errorMessage: "비밀번호가 일치하지 않습니다." });
				return;
			}
		}

		axios
			.post("http://18.223.115.35:3000/users/signup", data)
			.then(data => {
				console.log("성공!", data);
			})
			.catch(err => {
				console.dir(err);
				throw err;
			});
	};

	render() {
		const {
			name,
			phone,
			address,
			isDaumPost,
			fullAddress,
			zoneCode,
			isRegister,
		} = this.state;
		const width = 595;
		const height = 450;
		const modalStyle = {
			position: "absolute",
			top: 0,
			left: "-178px",
			zIndex: "100",
			border: "1px solid #000000",
			overflow: "hidden",
		};
		return (
			<div>
				<center>
					<img src="/images/main/logo_img_small.jpg" alt="img" />
					<h1>Sign Up</h1>
					<form onSubmit={e => e.preventDefault()}>
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
								onClick={this.handleOpen}
							/>
						</div>
						{isDaumPost ? (
							<DaumPostCode
								onComplete={this.handleLocation}
								autoClose
								width={width}
								height={height}
								style={modalStyle}
								isDaumPost={isDaumPost}
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
						<button type="submit" onClick={this.handleSignup}>
							확인
						</button>
					</form>
				</center>
			</div>
		);
	}
}

export default withRouter(Signup);
