import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Matple from "../../components/matple/Matple";
import MatzipList from "../../components/matzipList/MatzipList";
import styles from "./main.module.css";

const Main = () => {
	return (
		<section className={styles.main}>
			<Header />
			<div className={styles.container}>
				<MatzipList />
				<Matple />
			</div>
			<Footer />
		</section>
		// <div>
		// 	<img src="/images/main/logo_img_small.jpg" alt="img" />

		// 	<button
		// 		onClick={() => {
		// 			history.push("/login");
		// 		}}>
		// 		LOGIN
		// 	</button>
		// </div>
	);
};

export default Main;

//https://i.ibb.co/8xm0sHy/logo-img-small-1.jpg
