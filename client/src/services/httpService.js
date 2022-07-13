import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  console.log(error);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500 &&
    error.response.status !== 401;

  const originalRequest = error.config;
  // console.log(originalRequest)

  if (error.response === undefined) {
    return;
  }
  if (error.response.status === 400) {
    console.log(error.response.data);
    toast.error(error.response.data.error);
  }
  try {
    if (error.response.status === 404) {
    }
  } catch (error) {}

  if (expectedError) {
    // console.log(error.response.data, ":)");
    // toast.error(error.response.data);
    try {
    } catch (error) {}
  }

  if (error.response.status === 404) {
    const language = localStorage.getItem("i18nextLng");
    // if (language === "en") toast.error('Module Not Found');
    // if (language === "fa") toast.error("پیدا نشد");
    return;
  }

  if (error.response.status === 301) {
    console.log(error.response.data.status_text);
    window.location.replace(error.response.data.status_text);
  }

  if (expectedError) {
    // console.log(error.response.data, ":)");
    // toast.error(error.response.data);
  }

  if (error.response.status === 500) {
    // toast.error("Error 500")
  }

  if (error.response.status === 401) {
    console.log(error.response);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
