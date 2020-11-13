import React from "react";
import styles from "./matzip.module.css";

let apikey = process.env.REACT_APP_APIKEY;

const Matzip = ({ name, photo }) => {
	const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${apikey}`;
	//console.log(url);
	return (
		<div className={styles.matzip}>
			<div className={styles.photoDiv}>
				<img className={styles.photo} src={url} alt="matzip" />
			</div>
			<p className={styles.title}>{name}</p>
		</div>
	);
};
export default Matzip;
