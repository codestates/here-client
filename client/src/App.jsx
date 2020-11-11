import React, { Component } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route exact path="/" component={Main} />
					<Route path="/login" component={Login} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
