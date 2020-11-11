import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";

class App extends Component {
	render() {
		return (
			<div>
				<HashRouter>
					<Route exact path="/" component={Main} />
					<Route path="/login" component={Login} />
				</HashRouter>
			</div>
		);
	}
}

export default App;
