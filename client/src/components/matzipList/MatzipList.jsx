import React from "react";
import styles from "./matzipList.module.css";
//import dummyData from "../../test.json";
import Matzip from "../matzip/Matzip";

const MatzipList = ({ matple }) => {
	return (
		<div className={styles.totalMatzip}>
			<h1 className={styles.title}>맛플루언서가 선정한 이달의 맛집</h1>
			<div className={styles.container}>
				{matple.map(res => {
					return (
						<Matzip
							key={res.id}
							id={res.id}
							name={res.name}
							photo={res.photoRef}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default MatzipList;
