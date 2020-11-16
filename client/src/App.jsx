import React, { Component } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Main from "./pages/main/Main";
import HereModal from "./HereModal";
import UserDetail from "./pages/userDetail/UserDetail";

class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		modal: false,
		isReady: true,
		signIn: true,
		signUp: true,
	};

	handleResponseSuccess = () => {
		// axios
		// 	.get("http://18.223.115.35:3000/restaurant/get/matpleslike") //로그인 성공한 주소
		// 	.then(res => {
		// 		this.setState({ isLogin: true, userInfo: res.data });
		// 		console.log(res.data);
		// 		this.props.history.push("/main");
		// 	})
		// 	.catch(err => {
		// 		throw err;
		// 	});
	};

	// componentDidMount() {
	// 	this.handleResponseSuccess();
	// }

	componentDidMount() {
		const body = document.querySelector("body");
		body.className = "modalBody";
		setTimeout(this.handleOpenModal, 3000);
	}

	handleLogout = () => {
		const fetch = require("node-fetch");
		fetch("http://localhost:5000/users/logout", {
			method: "POST", // or 'PUT'
			//body: JSON.stringify(), // data can be `string` or {object}!
			// headers: {
			// 	"Content-Type": "application/json",
			// },
		})
			// .then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.then(() => {
				console.log("로그아웃 성공!");
				this.setState({ isLogin: false, userInfo: null });
				this.props.history.push("/");
			})
			.catch(error => console.error("Error:", error));
		// axios
		// 	.post("http://18.223.115.35:3000/logout") //로그아웃 주소받아서
		// 	.then(() => {
		// 		this.setState({ isLogin: false, userInfo: null });
		// 		this.props.history.push("/login");
		// 	});
	};

	handleOpenModal = () => {
		this.setState({
			modal: true,
		});
	};

	render() {
		const { isLogin, userInfo, modal, isReady, signIn, signUp } = this.state;
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						{this.state.modal && (
							<HereModal
								signIn={signIn}
								handleResSuccess={this.handleResponseSuccess}
							/>
						)}
					</Route>
					<Route path="/main">
						<Main handleLogout={this.handleLogout} />
					</Route>
					<Route path="/mypage">
						<UserDetail />
					</Route>
					<Route path="/signup">
						<HereModal signUp={signUp} />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
