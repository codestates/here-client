import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
//유저 정보를 data로 받아서 출력
const UserDetail = () => {
	fetch("http://localhost:5000/users/mypage", {
		method: "GET", // or 'PUT'
		// body: JSON.stringify(data), // data can be `string` or {object}!
		// headers: {
		// 	"Content-Type": "application/json",
		// },
	})
		// .then(res => res.json())
		.then(response => console.log("Success:", JSON.stringify(response)))
		.then(() => {
			console.log("마이페이지 성공!");
			this.props.handleSignIn();
		})
		.catch(error => console.error("Error:", error));

	return (
		<div>
			<Header />
			<section>
				<div className="userImage">
					{/* {user.img} */}
					{/* <img src={} alt="user" /> */}
				</div>
				<div className="userInfo">
					<span>{/* {user.name} {user.email} {user.password} */}</span>
				</div>
				<div calssName="btn">
					<button>변경</button>
					<button>탈퇴</button>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default UserDetail;
