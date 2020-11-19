import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./matzip.module.css";

let apikey = process.env.REACT_APP_APIKEY;

const Matzip = ({ name, photo, id, call, location }) => {
	const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${apikey}`;
	//console.log(url);

	console.log("맛집 디테일 테스트!", name, photo, id, call, location);
	return (
		<div className={styles.matzip}>
			<div className={styles.photoDiv}>
				<Link
					to={{
						pathname: "/matzipdetail",
						state: {
							name,
							photo,
							id,
							call,
							location,
						},
					}}>
					<img className={styles.photo} src={url} alt="matzip" />
				</Link>
			</div>
			<p className={styles.title}>{name}</p>
		</div>
	);
};
export default Matzip;
