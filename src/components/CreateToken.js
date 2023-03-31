import axios from "axios";
import { useState } from "react";
export default function CreateToken() {
	const [token, setToken] = useState(null);

	const headers = {
		"Content-Type": "application/json",
	};
	const data = {
		email: "1234",
		password: "1234",
	};

	async function getToken() {
		try {
			const response = await axios.post(
				"https://wp.maksy.site/wp-json/jwt-auth/v1/token",
				data,
				headers
			);
			const token = response.data.token;
			setToken(token);
		} catch (error) {
			console.log(error);
		}
	}
	getToken();

	if (token) {
		return token;
	}
}
