import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	headers: {
		"API-KEY": "c374876c-fca2-4e4c-bf40-751c8a269ed6",
	},
});

export const usersAPI = {
	getUsers(countItems = 50, page = 1) {
		return instance.get(`users?count=${countItems}&page=${page}`);
	},
};

export const followAPI = {
	unfollow(userId) {
		return instance.delete(`follow/${userId}`);
	},

	follow(userId) {
		return instance.post(`follow/${userId}`);
	},
};

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/${userId}`);
	},

	getStatus(userId) {
		return instance.get(`profile/status/${userId}`);
	},

	updateStatus(status) {
		return instance.put(`profile/status`, { status });
	},

	updateProfile(profile) {
		return instance.put(`profile`, profile);
	},

	uploadNewAvatar(file) {
		let formData = new FormData();
		formData.append("image", file);

		return instance.put(`profile/photo`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};

export const authAPI = {
	me() {
		return instance.get("auth/me");
	},
	login(userData) {
		return instance.post("auth/login", userData);
	},
	logout() {
		return instance.delete("auth/login");
	},
};

export const captchaAPI = {
	getCaptcha() {
		return instance.get("security/get-captcha-url");
	},
};
