import axios from "axios";
const base = `http://18.117.89.174:8080` || "/";
const api = axios.create({
	baseURL: base,
	headers: { "Content-Type": "application/json" },
});
export default api;
