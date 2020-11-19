import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Matple from "../../components/matple/Matple";
import Matzip from "../../components/matzip/Matzip";
import MatzipList from "../../components/matzipList/MatzipList";
import styles from "./main.module.css";

const Main = ({ userInfo, matple, aroundme }) => {
	console.log("main============>입장");
	console.log("main matple:", matple);
	console.log("main around:", aroundme);
	const listOfTitle = ["맛플루언서가 선정한 이달의 맛집", "내 주변의 맛집"];
	//여기까지 잘 됨
	return (
		<section className={styles.main}>
			<Header userInfo={userInfo} />
			<div className={styles.container}>
				<MatzipList title={listOfTitle[0]} matple={matple} />
				<Matple title={listOfTitle[1]} aroundme={aroundme} />
			</div>
			<Footer />
		</section>
	);
};

export default Main;
