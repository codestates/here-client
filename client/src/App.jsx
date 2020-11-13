import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Main from "./pages/main/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
	faUser,
	faBeer,
	faCoffee,
	faWineGlassAlt,
	faStroopwafel,
	faAppleAlt,
	faCookie,
} from "@fortawesome/free-solid-svg-icons";
import Signup from "./pages/signup/Signup";
import UserDetail from "./pages/userDetail/UserDetail";
import ModalPortal from "./pages/ModalPortal";
import HereModal from "./HereModal";

library.add(
	fab,
	faUser,
	faBeer,
	faCoffee,
	faWineGlassAlt,
	faStroopwafel,
	faAppleAlt,
	faCookie
);
//Auth : 사용자 정보가 있으면~
class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		modal: false,
	};

	handleResponseSuccess() {
		axios
			.get("http://18.223.115.35:3000/signin") //로그인 성공한 주소
			.then(res => {
				this.setState({ isLogin: true, userInfo: res.data });
				this.props.history.push("/main");
			})
			.catch(err => {
				throw err;
			});
	}

	// componentDidMount() {
	// 	this.handleResponseSuccess();
	// }
	componentDidMount() {
		setTimeout(this.handleOpenModal, 2000);
	}

	handleLogout = () => {
		axios
			.post("http://18.223.115.35:3000/logout") //로그아웃 주소받아서
			.then(() => {
				this.setState({ isLogin: false, userInfo: null });
				this.props.history.push("/login");
			});
	};

	handleOpenModal = () => {
		this.setState({
			modal: true,
		});
	};

	render() {
		const { isLogin, userInfo } = this.state;
		return (
			<div>
				{this.state.modal && (
					<ModalPortal>
						<HereModal />
					</ModalPortal>
				)}
				{/* <BrowserRouter>
					<Switch>
						<Route
							path="/"
							render={
								() => {
									this.state.modal && (
										<ModalPortal>
											<HereModal />
										</ModalPortal>
									);
								}
								// <Login
								// 	handleResponseSuccess={this.handleResponseSuccess.bind(this)}
								// />
							}
						/>
						<Route exact path="/signup" render={() => <Signup />} />
						<Route exact path="/mypage" render={() => <UserDetail />} />
						<Route
							exact
							path="/main"
							render={() => (
								<Main userInfo={userInfo} handleLogout={this.handleLogout} />
							)}
						/>
						<Route
							exact
							path="/"
							render={() => {
								if (isLogin) {
									return <Redirect to="/main" />;
								}
								return <Redirect to="/login" />;
							}}
						/>
					</Switch>
				</BrowserRouter> */}
				{/* <BrowserRouter>
        --> 왜 브라우저라우터를 상위에 선언해야하는지 의문
					<Switch>
						<Route exact path="/">
							<Login />
						</Route>
						<Route path="/main">
							<Main />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
					</Switch>
				</BrowserRouter> */}
			</div>
		);
	}
}

export default App;
