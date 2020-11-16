import React, { useEffect, useRef, useState } from "react";
import HereModal from "../HereModal";

const ModalCont = () => {
	const modalEl = useRef();
	const [mOpen, setOpen] = useState(false);

	const handleClickOutside = ({ target }) => {
		if (mOpen && !modalEl.current.contains(target)) setOpen(false);
	};

	useEffect(() => {
		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return mOpen && <HereModal />;
};

export default ModalCont;
