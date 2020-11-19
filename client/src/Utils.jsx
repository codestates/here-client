import React from "react";

export default function Utils() {
	const handleCookies = {
		// 로그아웃을 하면 userInfo 날린다.
		_dropCookie: key => {
			const allCookie =
				document.cookie && document.cookie.split("").includes(";")
					? document.cookie.split("; ")
					: document.cookie;
			const cookieObj = {};
			allCookie.forEach(cookie => {
				const [cookieKey, cookieVal] = cookie.split("=");
				cookieObj[cookieKey] = cookieVal;
			});

			for (let cookieKey in cookieObj) {
				if (cookieKey === key) {
					cookieObj[key] = null;
				}
				if (cookieObj[cookieKey]) {
					handleCookies._setCookie(cookieKey, cookieObj[cookieKey]);
				}
			}
		},

		_setCookie: (key, val) => {
			document.cookie = `${key}=${JSON.stringify(val)}`;
		},

		// userDetail로 간다.
		// 브라우저 상에 쿠기로 받은 정보를 저장한다.  ex) userInfo ==> userInfo(key) : {val} 결과는 {val}
		_getCookie: inputKey => {
			const allCookie =
				document.cookie && document.cookie.split("").includes(";")
					? document.cookie.split("; ")
					: document.cookie;
			let result;

			if (allCookie) {
				for (let cookie of allCookie) {
					const [key, val] = cookie.split("=");
					if (key === inputKey) {
						result = JSON.parse(val);
						break;
					}
				}
			}
			return result;
		},
	};
	return handleCookies;
}
