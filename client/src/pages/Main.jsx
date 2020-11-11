import React from "react";
import { useHistory } from "react-router-dom";

const Main = props => {
	const history = useHistory();
	//const [login, setLogin] = useState();

	return (
		<div>
			<img src="/images/main/logo_img_small.jpg" alt="img" />

			<button
				onClick={() => {
					history.push("/login");
				}}>
				LOGIN
			</button>
		</div>
	);
};

export default Main;

//https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg
