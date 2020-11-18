import React, {useState} from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./userDetail.module.css";
import mypageTest from "../../mypageTest.json"
import axios from "axios";

const UserDetail = () => {

	const mypageData = mypageTest[0].User
	mypageData.location = mypageData.location.split('@')[0]
	
	// const [mypageData, setUser] = useState(null)
	// const getUserDetail = async () => {
	// 	const userData = await axios.post(
	// 		"https://3.208.29.18:443/users/mypage",
	// 		// { headers  <--- 인증정보를 담아서 }
	// 	)
	// 	setUser(userData.data[0].User);
	// };

	return (
		<div>
			<Header />
			<div className={styles.userDetail}>
				<section className={styles.userBox}>
					<img className={styles.userImage} src={mypageData.imageRef ? mypageData.imageRef : "https://i.ibb.co/dgQFdDd/icon-user-default.png"} alt="userimage" />
					<div className={styles.userInfo}>
						<h4>NAME : {mypageData.name}</h4>
						<h4>EMAIL : {mypageData.email}</h4>
						<h4>MOBILE : {mypageData.mobile}</h4>
						<h4>LOCATION : {mypageData.location}</h4>
					</div>
				{/* <div calssName={styles.btn}>
					<button>변경</button>
					<button>탈퇴</button>
				</div> */}	
			</section>
			</div>
			<Footer />
		</div>
	);
};

export default UserDetail;
