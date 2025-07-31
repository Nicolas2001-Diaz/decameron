import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.reload();

      return error;
    }

    throw error;
  }
);

export default axiosClient;
