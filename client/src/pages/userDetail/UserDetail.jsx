import React, { useState } from "react";
// import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./userDetail.module.css";

import Utils from "../../Utils";
const { _dropCookie, _setCookie, _getCookie } = Utils();

// import userInfo from "../../userInfo.json";
// import mypageTest from "../../mypageTest.json"
// info 정보는 쿠키의 userInfo에서
// InfoChange 상태 false로
// 변경 버튼을 클릭하면 InfoChange 상태를 true로
// 상태가 true이면 화면에 input창 출력
// input 창에는 기본적으로 기존 정보가 담겨 있도록
// 확인 버튼을 누르면 요청이 전송되게......

const UserDetail = ({ userInfo }) => {
	// const mypageData = userInfo[0].User
	const mypageData = userInfo;
	mypageData.location = mypageData.location
		? mypageData.location.split("@")[0]
		: "서울특별시 용산구";
	const { password, name, email, mobile, location } = mypageData;
	// const [name, setName] = useState(mypageData.name);
	// const [email, setEmail] = useState(mypageData.email);
	// const [mobile, setMobile] = useState(mypageData.mobile);
	// const [location, setLocation] = useState(mypageData.location);
	// const [password, setPassword] = useState("");
	const [dataOfUser, setDataOfUser] = useState({ ...mypageData });
	const [changeInfo, setChangeInfo] = useState(false);

	console.log("트루냐 펄스냐?", changeInfo);

	const handleInputValue = key => event => {
		if (event.currentTarget === null) {
			return;
		}
		event.preventDefault();
		setDataOfUser({ ...dataOfUser, [key]: event.currentTarget.value });
	};

	const fixInfo = async event => {
		try {
			event.preventDefault();
			console.log("풋요청 보내봅니다2");
			const data = {
				...mypageData,
				password: dataOfUser.password,
				inputName: dataOfUser.name,
				inputMobile: dataOfUser.mobile,
				inputLocation: dataOfUser.location,
			};
			console.log(data);

			await fetch("https://soltylink.com/users/mypage", {
				method: "PUT",
				body: JSON.stringify(data),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(json => json.json())
				.then(data => console.log(data))
				.error(error => {
					console.log("풋요청 보내봤습니다2 에러뜨네요");
					console.log(error);
				});
			const cookieUserInfo = {
				..._getCookie("userInfo"),
				name: dataOfUser.name,
				mobile: dataOfUser.mobile,
				location: dataOfUser.location,
			};
			_setCookie("userInfo", cookieUserInfo);
			mypageData.name = cookieUserInfo.name;
			mypageData.mobile = cookieUserInfo.mobile;
			mypageData.location = cookieUserInfo.location;
			changeInfo(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Header />
			<div className={styles.userDetail}>
				{!changeInfo ? (
					<section className={styles.userBox}>
						<img
							className={styles.userImage}
							src={
								mypageData.imageRef
									? mypageData.imageRef
									: "https://i.ibb.co/dgQFdDd/icon-user-default.png"
							}
							alt="userimage"
						/>
						<div className={styles.userInfo}>
							<h4>NAME : {mypageData.name}</h4>
							<h4>MOBILE : {mypageData.mobile}</h4>
							<h4>LOCATION : {mypageData.location}</h4>
						</div>
						<div className={styles.btn}>
							<button onClick={() => setChangeInfo(true)}>변경</button>
						</div>
					</section>
				) : (
					<div className={styles.userDetail}>
						<section className={styles.userBox}>
							<img
								className={styles.userImage}
								src={
									mypageData.imageRef
										? mypageData.imageRef
										: "https://i.ibb.co/dgQFdDd/icon-user-default.png"
								}
								alt="userimage"
							/>
							<form className={styles.userInfo}>
								<input
									className={styles.input}
									type="name"
									placeholder={name}
									onChange={handleInputValue("name")}
								/>
								<input
									className={styles.input}
									type="mobile"
									placeholder={mobile}
									onChange={handleInputValue("mobile")}
								/>
								<input
									className={styles.input}
									type="location"
									placeholder={location}
									onChange={handleInputValue("location")}
								/>
								<input
									className={styles.input}
									type="password"
									placeholder="Password를 입력해주세요"
									onChange={handleInputValue("password")}
								/>
								<div>
									<button
										type="submit"
										className={styles.button}
										onClick={e => {
											fixInfo(e);
										}}>
										확인
									</button>
									<button onClick={() => setChangeInfo(false)}>뒤로</button>
								</div>
							</form>
						</section>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default UserDetail;
