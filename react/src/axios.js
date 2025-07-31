import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://decameron-taupe.vercel.app/api/api/`,
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
