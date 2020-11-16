import React from "react";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Header = props => (
	<header className={styles.header}>
		<div className={styles.buttons}>
			<Link to={{ pathname: "/login" }}>
				<div>
					<button className={styles.logout} onClick={props.handleLogout}>
						logout
					</button>
				</div>
			</Link>

			<Link to={{ pathname: "/mypage" }}>
				<div className={styles.myInfo}>
					<FontAwesomeIcon icon={faUserCircle} size="2x" />
				</div>
			</Link>
		</div>
		<Link to={{ pathname: "/" }}>
			<img
				className={styles.logo}
				src="https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg"
				alt="HERE"
			/>
		</Link>
		<h1 className={styles.title}>맛에 진심인 사람들, 여기지!</h1>
	</header>
);

export default Header;
