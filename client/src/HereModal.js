import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./modal.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const HereModal = ({ signIn, signUp, handleResSuccess }) => {
	const modalEl = useRef();
	const history = useHistory();

	const handleSignIn = () => {
		const modal = modalEl.current;
		modal.className = "out";
		document.querySelector("body").removeAttribute("class");
		history.push("/main");
	};

	const handleSignUp = () => {};

	return (
		<div ref={modalEl} id="modal-container" className="one">
			<div className="modal-background">
				<div className="modal">
					{signIn && (
						<Login
							handleSignIn={handleSignIn}
							handleResponseSucces={handleResSuccess}
						/>
					)}
					{signUp && <Signup onClick={handleSignUp} />}
				</div>
			</div>
		</div>
	);
};

export default HereModal;
