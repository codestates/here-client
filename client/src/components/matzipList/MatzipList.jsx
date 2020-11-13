import React from "react";
import styles from "./matzipList.module.css";
import dummyData from "../../test.json";
import Matzip from "../matzip/Matzip";

const MatzipList = () => {
	return (
		<div className={styles.totalMatzip}>
			<h1 className={styles.title}>[음식] 맛집</h1>
			<div className={styles.container}>
				{dummyData.results.map((el, index) => {
					return (
						<Matzip
							key={index}
							name={el.name}
							photo={el.photos[0].photo_reference}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default MatzipList;
