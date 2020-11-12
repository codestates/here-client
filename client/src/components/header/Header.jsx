import React from "react";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = props => (
	<header className={styles.header}>
		<span className={styles.myInfo}>
			<FontAwesomeIcon icon={faUserCircle} size="2x" />
		</span>

		<img
			className={styles.logo}
			src="https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"
			alt="HERE"
		/>
		<h1 className={styles.title}>맛에 진심인 사람들, 여기지!</h1>
	</header>
);

export default Header;
