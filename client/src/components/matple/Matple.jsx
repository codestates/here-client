import React from "react";
import Matzip from "../matzip/Matzip";
import styles from "./matple.module.css";

const Matple = ({ title, aroundme }) => {
	return (
		<div className={styles.totalMatzip}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.container}>
				{aroundme.map(res => {
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
export default Matple;
