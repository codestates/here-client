import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Matple from "../../components/matple/Matple";
import MatzipList from "../../components/matzipList/MatzipList";
import styles from "./main.module.css";

const Main = ({ userInfo, matple }) => {
	console.log("main============>입장");
	console.log(userInfo);

	//const { matple } = matple;
	return (
		<section className={styles.main}>
			<Header userInfo={userInfo} />
			<div className={styles.container}>
				<MatzipList matple={matple} />
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
