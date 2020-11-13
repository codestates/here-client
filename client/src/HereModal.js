import React, { useRef } from "react";
import "./modal.css";
import Login from "./pages/login/Login";

const HereModal = () => {
	const ref = useRef();

	// const handleClick = () => {
	// 	const modal = ref.current;
	// 	modal.className = "out";
	// };
	return (
		<>
			<div ref={ref} id="modal-container" className="one">
				<div className="modal-background">
					<div className="modal">
						<Login />
					</div>
				</div>
			</div>
		</>
	);
};

export default HereModal;
