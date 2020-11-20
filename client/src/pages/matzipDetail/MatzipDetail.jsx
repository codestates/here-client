import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./matzipDetail.module.css";
//import getResInfo from "../../getResInfo.json";
//import axios from "axios";
const apikey = process.env.REACT_APP_APIKEY;

// const ResData = getResInfo.sendingData;
// ResData.location = ResData.location.split("@")[0];
const MatzipDetail = props => {
	console.log("맛집디테일 입성 후 :", props);
	// const [ResData, setMatzip] = useState(null)
	// const getMatzipDetail = async () => {
	// 	const matzipData = await axios.get(
	// 		"https://3.208.29.18:443/restaurant/get/restinfo/:id",
	// 		// { headers  <--- 인증정보를 담아서 }
	// 	)
	// 	setMatzip(matzipData.data.sendingData);
	// };
	let { id, name, call, photo, location } = props.location.state;
	const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${apikey}`;
	location = location.split("@")[0];
	if (id) {
		return (
			<div>
				<Header />
				<div className={styles.mazipDetail}>
					<section className={styles.matzipBox}>
						<img
							className={styles.mztzipImage}
							src={url ? url : "https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"}
							alt="matzipimage"
						/>
						<div className={styles.matzipInfo}>
							<h4>NAME : {name}</h4>
							<h4>CALL : {call}</h4>
							<h4>ADDRESS : {location}</h4>
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
};

export default MatzipDetail;
