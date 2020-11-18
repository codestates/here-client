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

axios.baseURL = "https://soltylink.com";
class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		modal: false,
		signIn: true,
		signUp: true,
		mailExist: false,
		mail: "",
	};

	handleResponseSuccess = () => {
		//userInfo 담기위한
		// this.setState({ isLogin: true, userInfo: data });
		// console.log("app.js에서 data보이나?", data);
		//window.history.pushState("login", "", "/login");
		axios
			.get("/users/mypage")
			//.get("https://www.soltylink.com/users/mypage")
			.then(res => {
				this.setState({ isLogin: true, userInfo: res.data });
				console.log("userInfo:", res.data);
				this.props.history.push("/main");
			})
			.catch(err => {
				throw err;
			});
	};

	componentDidMount() {
		//모달창 띄우기
		const body = document.querySelector("body");
		body.className = "modalBody";
		setTimeout(this.handleOpenModal, 3000);
		//인증되었는지 확인
		//this.handleResponseSuccess();
		//modal state를 다시 원상복구
		this.setState({ modal: false });
	}

	handleLogout = () => {
		// const fetch = require("node-fetch");
		// fetch("http://18.223.115.35:3000/users/logout", {
		// 	method: "POST", // or 'PUT'
		// 	//body: JSON.stringify(), // data can be `string` or {object}!
		// 	// headers: {
		// 	// 	"Content-Type": "application/json",
		// 	// },
		// })
		// 	// .then(res => res.json())
		// 	.then(response => console.log("Success:", JSON.stringify(response)))
		// 	.then(() => {
		// 		console.log("로그아웃 성공!");
		// 		this.setState({ isLogin: false, userInfo: null });
		// 		this.props.history.push("/");
		// 	})
		// 	.catch(error => console.error("Error:", error));
		axios
			.post("/logout") //로그아웃 주소받아서
			.then(() => {
				this.setState({ isLogin: false, userInfo: null });
				//history.pushState("/login");
			});
	};

	handleOpenModal = () => {
		this.setState({
			modal: true,
		});
	};

	render() {
		const { isLogin, userInfo, signIn, signUp } = this.state;
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						{this.state.modal && (
							<HereModal
								signIn={signIn}
								mail={this.state.mail}
								handleResSuccess={this.handleResponseSuccess}
							/>
						)}
					</Route>
					<Route path="/main">
						<Main handleLogout={this.handleLogout} userInfo={userInfo} />
					</Route>
					<Route
						path="/mypage"
						render={() => {
							if (!isLogin) {
								return <Redirect to="/" />;
							}
						}}>
						<UserDetail />
					</Route>
					<Route path="/signup">
						<HereModal signUp={signUp} mail={this.state.mail} />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
