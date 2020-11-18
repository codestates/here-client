import React, {useState} from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./matzipDetail.module.css";
import getResInfo from "../../getResInfo.json";
import axios from "axios";


const ResData = getResInfo.sendingData;
ResData.location = ResData.location.split("@")[0];

const MatzipDetail = () => {
	
	// const [ResData, setMatzip] = useState(null)
	// const getMatzipDetail = async () => {
	// 	const matzipData = await axios.get(
	// 		"https://3.208.29.18:443/restaurant/get/restinfo/:id",
	// 		// { headers  <--- 인증정보를 담아서 }
	// 	)
	// 	setMatzip(matzipData.data.sendingData);
	// };
	
	
	return (
		<div>
			<Header />
			<div className={styles.mazipDetail}>
				<section className={styles.matzipBox}>
					<img className={styles.mztzipImage} src={ResData.photoRef ? ResData.photoRef : "https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"} alt="matzipimage" />
					<div className={styles.matzipInfo}>
						<h4>NAME : {ResData.name}</h4>
						<h4>ADDRESS : {ResData.location}</h4>
						<h4>CALL : {ResData.callNum}</h4>
						<h4>MAINMENU : {ResData.mainmenu}</h4>
					</div>
			</section>
			</div>
			<Footer />
		</div>
	);
};

export default MatzipDetail;
