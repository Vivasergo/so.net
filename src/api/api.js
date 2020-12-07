import Axios from "axios";

const instance = Axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "16bdc2c1-972d-4e2a-bc0d-2079b8c82fbf",
  },
});

export const usersAPI = {
  getUsers(countItems = 50, page = 1) {
    return instance
      .get(`users?count=${countItems}&page=${page}`)
      .then((response) => response.data);
  },
};

export const followAPI = {
  //the same, but using async/await syntax
  async unfollow(userId) {
    const response = await instance.delete(`follow/${userId}`);
    return response.data;
  },

  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status }).then((response) => {
     return response;
    });
  },
};

export const authAPI = {
  me() {
    return instance.get("auth/me").then((response) => response.data);
  },
};
