import React, {useState, useEffect} from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./userDetail.module.css";

import axios from "axios";

//유저 정보를 data로 받아서 출력
// props로 받으면 렌더링될 때 바로 함께 출력
// url 통해서 직접 받아오면 렌더링 전에 넣어줄 방법은?

const UserDetail = () => {
	const [user, setUser] = useState(null)
	
	const getUser = async () => {
		const userData = await axios.post("http://localhost:3000/users/mypage", {id : 12});
		// const userData = await axios.get("http://localhost:3000/users/mypage");
		setUser(userData.data);
		const address = user.location
		
    console.log(user);
	};

	
	const onClick = () => {
		getUser();
	}
	

	// fetch("http://localhost:3000/users/mypage", {
	// 	method: "GET", // or 'PUT'
	// 	// body: JSON.stringify(data), // data can be `string` or {object}!
	// 	// headers: {
	// 	// 	"Content-Type": "application/json",
	// 	// },
	// })
	// 	// .then(res => res.json())
	// 	.then(response => console.log("Success:", JSON.stringify(response)))
	// 	.then((response) => {
	// 		setUser({response});
	// 		console.log("마이페이지 성공!");
	// 		// this.props.handleSignIn();
	// 	})
	// 	.catch(error => console.error("Error:", error));
	// 	console.log(user);

	return (
		<div>
			<Header />
			<section className={styles.userBox}>
				<div className={styles.userImgBox}>
					<img className={styles.userImage} src="https://i.ibb.co/dgQFdDd/icon-user-default.png" alt="userimage" />
				</div>
				{ user ? (
				<div className={styles.userInfo}>
					<h4>NAME : {user.name}</h4>
					<h4>EMAIL : {user.email}</h4>
					<h4>MOBILE : {user.mobile}</h4>
					<h4>LOCATION : {user.location}</h4>
				</div> ) : (<div className={styles.userInfo}>
					<h4>NAME : </h4>
					<h4>EMAIL : </h4>
					<h4>MOBILE : </h4>
				</div>)}
				<div calssName={styles.btn}>
					<button>변경</button>
					<button>탈퇴</button>
					<button onClick={onClick}>유저정보 나와랏~</button>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default UserDetail;
