import React, { Component } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
	withRouter,
} from "react-router-dom";
import Main from "./pages/main/Main";
import HereModal from "./HereModal";
import UserDetail from "./pages/userDetail/UserDetail";
import MatzipDetail from "./pages/matzipDetail/MatzipDetail";
import "./modal.css";

import Utils from "./Utils";
const { _dropCookie, _setCookie, _getCookie, _checkCookie } = Utils();

const fetch = require("node-fetch");

class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		matple: {},
		aroundme: {},
		modal: false,
		signIn: true,
		signUp: true,
		mailExist: false,
		mail: "",
	};

	handleResponseSuccess = async userInfo => {
		console.log("userInfo수정후테스트");
		try {
			const { id } = userInfo;
			_setCookie("userInfo", userInfo);
			const matple = await fetch(
				"https://soltylink.com/restaurant/matpleslike"
			).then(data => data.json());
			const aroundme = await fetch(
				"https://soltylink.com/restaurant/aroundme/" + id
			).then(data => data.json());

			_setCookie("matple", matple);
			_setCookie("aroundme", aroundme);

			console.log("matple test: ", matple);
			console.log("aroundme test: ", aroundme);
			// this.setState({ isLogin: true, userInfo, matple, aroundme });
			this.setState(prevState => {
				const newState = {
					...prevState,
					isLogin: true,
					userInfo,
					matple,
					aroundme,
				};
				return newState;
			});
			console.log("handleResponseSuccess: ", this.state);
		} catch (err) {
			console.log(err);
		}
	};

	componentDidMount() {
		//모달창 띄우기
		const body = document.querySelector("body");
		body.className = "modalBody";
		setTimeout(this.handleOpenModal, 1000);
		//인증되었는지 확인
		//this.handleResponseSuccess();
		this.setState({ modal: false });
	}

	componentDidUpdate() {
		console.log("componentDidMount - this.state: ", this.state);
	}

	handleLogout = () => {
		axios
			.post("https://soltylink.com/users/logout", {}) //500에러남 -> 그래서 다시 mypage오면 접속됨
			.then(() => {
				this.setState({ isLogin: false, userInfo: null });
				_dropCookie("userInfo");
				this.props.history.push("/");
			})
			.catch(err => console.log(err));
	};

	handleOpenModal = () => {
		this.setState({
			modal: true,
		});
	};
	_checkCookie = () => {
		const allCookie =
			document.cookie && document.cookie.split("").includes(";")
				? document.cookie.split("; ")
				: document.cookie;
		if (allCookie) {
			allCookie.forEach(cookie => {
				const [key, val] = cookie.split("=");
				if (key === "userInfo") {
					this.state.isLogin = true;
					this.state.userInfo = JSON.parse(val);
				} else if (key === "matple") {
					this.state.matple = JSON.parse(val);
				} else if (key === "aroundme") {
					this.state.aroundme = JSON.parse(val);
				}
			});
		}
	};

	render() {
		this._checkCookie();
		const { isLogin, userInfo, signIn, signUp, matple, aroundme } = this.state;
		return (
			<>
				{console.log(document.cookie)}
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							if (isLogin) {
								return <Redirect to="/main" />;
							} else if (this.state.modal) {
								return (
									<div className="modalBody">
										<HereModal
											signIn={signIn}
											handleResSuccess={this.handleResponseSuccess}
										/>
									</div>
								);
							}
						}}
					/>

					<Route path="/main">
						<Main userInfo={userInfo} matple={matple} aroundme={aroundme} />
					</Route>
					<Route path="/mypage">
						<UserDetail userInfo={userInfo} />
					</Route>
					<Route path="/matzipdetail" component={MatzipDetail} />
					<Route path="/signup">
						<HereModal signUp={signUp} />
					</Route>
					<Route
						path="/logout"
						render={() => {
							this.handleLogout();
						}}
					/>
					<Route
						render={({ location }) => (
							<div>
								<h2>이 페이지는 존재하지 않습니다:</h2>
								<p>{location.pathname}</p>
							</div>
						)}
					/>
				</Switch>
			</>
		);
	}
}

export default withRouter(App);
