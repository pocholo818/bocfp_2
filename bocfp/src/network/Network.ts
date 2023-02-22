import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    if (config.headers == undefined) {
      config.headers = {};
    }

    if (config.url !== "/user/login" && config.url !== "/user/refresh") {
      config.headers["authorization"] = `Bearer ${localStorage.getItem('access_token')}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

setInterval(() => {
  if(localStorage.getItem('refresh_token')) {
    instance.post("/user/refresh", {
      refreshToken: localStorage.getItem('refresh_token')
    })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('access_token', response.data.accessToken)
        } else {
          Promise.reject();
        }
      })
      .catch(error => {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        localStorage.setItem('is_logged_in', 'false')
      });
  }
  else {
    localStorage.removeItem('access_token')
    localStorage.setItem('is_logged_in', 'false')
  }
}, 1800000);

export { instance };
