import React, { useRef } from "react";
//import { useHistory } from "react-router-dom";
import "./modal.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const HereModal = ({ signIn, signUp, handleResSuccess, mail }) => {
	const modalEl = useRef();
	//const history = useHistory();

	const handleSignIn = data => {
		//body에 background를 없앤다
		const modal = modalEl.current;
		modal.className = "out";
		document.querySelector("body").removeAttribute("class");
		handleResSuccess(data);
	};

	return (
		<div ref={modalEl} id="modal-container" className="one">
			<div className="modal-background">
				<div className="modal">
					{signIn && <Login handleSignIn={handleSignIn} />}
					{signUp && <Signup mail={mail} />}
				</div>
			</div>
		</div>
	);
};

export default HereModal;
