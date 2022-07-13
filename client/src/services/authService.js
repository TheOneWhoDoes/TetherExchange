import http from "./httpService";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { apiUrl } from "../config.json";

const apiEndpointLogin = "http://localhost:8081/users/login";
const apiEndpointLogout = "http://localhost:8081/users/logout";
const apiEndpointRegister = "http://localhost:8081/users/register";

const tokenKey = "access-token";

// http.setJwt(getJwt());

export async function login(mobile, password) {
  const obj = { mobile, password };
  const { data } = await http.post(apiEndpointLogin, obj, { 'Content-Type': 'application/json'});
  console.log(data);

  localStorage.setItem(tokenKey, data.token);
}

export async function register(mobile, first_name, last_name, email, password) {
  const obj = { mobile, first_name, last_name, email, password };
  const { data } = await http.post(apiEndpointRegister, obj);
  console.log(data);
  localStorage.setItem(tokenKey, data.token);
}

export function loginWithJwt(tokenValue) {
  localStorage.setItem(tokenKey, tokenValue);
}

export async function logout() {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await http.get(apiEndpointLogout, { headers });
    console.log(data);
    localStorage.removeItem(tokenKey);
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  }
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt).first_name + " " + jwt_decode(jwt).last_name;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  register,
  getToken,
  getUser,
};
