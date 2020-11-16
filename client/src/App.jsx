import React, { Component } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Main from "./pages/main/Main";
import Signup from "./pages/signup/Signup";
import UserDetail from "./pages/userDetail/UserDetail";
import HereModal from "./HereModal";
import ModalCont from "./components/modalCont";

class App extends Component {
	state = {
		isLogin: false,
		userInfo: null,
		modal: false,
		isReady: true,
		signIn: true,
		signUp: true,
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
		const body = document.querySelector("body");
		body.className = "modalBody";
		setTimeout(this.handleOpenModal, 5000);
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
		const { isLogin, userInfo, modal, isReady, signIn, signUp } = this.state;
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						{this.state.modal && <HereModal signIn={signIn} />}
					</Route>
					<Route path="/main">
						<Main />
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
