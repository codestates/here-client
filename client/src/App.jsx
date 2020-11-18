import React, { Component } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
	withRouter,
	HashRouter,
} from "react-router-dom";
import Main from "./pages/main/Main";
import HereModal from "./HereModal";
import UserDetail from "./pages/userDetail/UserDetail";

//axios.baseURL = "https://soltylink.com";
const fetch = require("node-fetch");
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post["Content-Type"] = "application/json";
class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		matple: {},
		location: {},
		modal: false,
		signIn: true,
		signUp: true,
		mailExist: false,
		mail: "",
	};

	handleResponseSuccess = userInfo => {
		console.log("userInfo수정후테스트");
		this.setState({ isLogin: true, userInfo: userInfo });
		// const location = {
		// 	pathname: "/main",
		// 	state: {
		// 		userInfo,
		// 	},
		// };
		console.log("userInfo 저장됨?", this.state.userInfo);
		fetch("https://soltylink.com/restaurant/matpleslike")
			.then(data => data.json())
			.then(matple => {
				console.log("Success matple:", matple);
				this.setState({ matple: matple });
				console.log("저장된 맛플:", this.state.matple);
				//console.log(this.props); //{} 나옴
				//this.history.push("/main"); 안돼
				this.goMain();
			})
			.catch(error => console.error("Error:", error));
		//userInfo 담기위한
		// console.log("app다시 들어옴");
		// this.setState({ isLogin: true, userInfo: userInfo });
		// console.log("userInfo 저장됨?", this.state.userInfo);
		// // console.log("app.js에서 data보이나?", data);
		// //window.history.pushState("login", "", "/login");
		// axios
		// 	.get("https://soltylink.com/restaurant/matpleslike")
		// 	//.get("https://www.soltylink.com/users/mypage")
		// 	.then(matple => {
		// 		//console.log("userInfo:", res.data); //user가 한번이라도 방문한 맛집
		// 		console.log("matple", matple);
		// 		this.setState({ matple: matple.data });
		// 		this.props.history.push("/main");
		// 		// await axios
		// 		// 	.get("https://soltylink.com/restaurant/aroundme")
		// 		// 	.then(location => {
		// 		// 		console.log("location:", location);
		// 		// 		this.setState({
		// 		// 			isLogin: true,
		// 		// 			userInfo: userInfo,
		// 		// 			matple: matple.data,
		// 		// 			location: location.data,
		// 		// 		});
		// 		// 	});
		// 	})
		// 	.catch(err => {
		// 		throw err;
		// 	});
	};

	goMain() {
		console.log("여기까지 옵니까?");
		this.props.history.push("main");
	}

	componentDidMount() {
		//모달창 띄우기
		const body = document.querySelector("body");
		body.className = "modalBody";
		setTimeout(this.handleOpenModal, 1000);
		//인증되었는지 확인
		//this.handleResponseSuccess();
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
			.post("https://soltylink.com/users/logout") //500에러남 -> 그래서 다시 mypage오면 접속됨
			.then(() => {
				this.setState({ isLogin: false, userInfo: null });
				this.history.pushState("/");
			});
	};

	handleOpenModal = () => {
		this.setState({
			modal: true,
		});
	};

	render() {
		const { isLogin, userInfo, signIn, signUp, matple } = this.state;
		return (
			<HashRouter>
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
					<Route path="main">
						<Main
							// handleLogout={this.handleLogout}
							userInfo={userInfo}
							matple={matple}
						/>
					</Route>
					<Route path="/mypage">
						<UserDetail userInfo={userInfo} />
					</Route>
					<Route path="/signup">
						<HereModal signUp={signUp} mail={this.state.mail} />
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
			</HashRouter>
		);
	}
}

export default App;
