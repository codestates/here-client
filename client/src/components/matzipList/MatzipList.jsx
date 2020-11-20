import React from "react";
import styles from "./matzipList.module.css";
//import dummyData from "../../test.json";
import Matzip from "../matzip/Matzip";

const MatzipList = ({ title, matple }) => {
	console.log("맛플입장~~~~");
	console.log("matple: ", matple);

	return (
		<div className={styles.totalMatzip}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.container}>
				{matple.map(res => {
					return (
						<Matzip
							key={res.id}
							id={res.id}
							name={res.name}
							photo={res.photoRef}
							call={res.callNum}
							location={res.location}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default MatzipList;
