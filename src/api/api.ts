import { ProfileType, AuthData } from './../Types/types';
import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	headers: {
		"API-KEY": "166676e4-122d-492a-9e83-9e4ac780a77c",
	},
});

export const usersAPI = {
	getUsers(countItems = 50, page = 1) {
		return instance.get(`users?count=${countItems}&page=${page}`);
	},
};

export const followAPI = {
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },

  updateStatus(status:string) {
    return instance.put(`profile/status`, { status });
  },

  updateProfile(profile:ProfileType) {
    return instance.put(`profile`, profile);
  },

  uploadNewAvatar(file:any) {
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
		return instance.get<MeResponseType>("auth/me").then(resp =>resp.data);
	},
	login(userData: AuthData) {
		return instance.post<LoginType>("auth/login", userData);
	},
	logout() {
		return instance.delete<LogoutType>("auth/login");
	},
};

export const captchaAPI = {
	getCaptcha() {
		return instance.get<CaptchaAPIType>("security/get-captcha-url");
	},
};




type CaptchaAPIType = {
	url:string
}

type MeResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};

type LoginType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

type LogoutType = {
  resultCode: number;
};