import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/client";

export default function Login() {
	const [email, setEmail] = React.useState("admin@example.com");
	const [password, setPassword] = React.useState("admin");
	const [error, setError] = React.useState("");
	const nav = useNavigate();
	const loc = useLocation();
	async function submit(e) {
		e.preventDefault();
		setError("");
		try {
			// Replace with your real /auth/login endpoint
			const { data } = await api.post("/auth/login", { email, password });
			localStorage.setItem("token", data.token || "dev-token");
			nav(loc.state?.from?.pathname || "/admin", { replace: true });
		} catch (err) {
			setError(err.response?.data?.message || err.message || "Login failed");
		}
	}
	return (
		<form
			onSubmit={submit}
			className="card"
			style={{ maxWidth: 420, margin: "40px auto" }}
		>
			<h2>Admin Login</h2>
			<div className="mt-8">
				<label>
					Email
					<br />
					<input
						className="input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
			</div>
			<div className="mt-8">
				<label>
					Password
					<br />
					<input
						className="input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
			</div>
			{error && <div className="badge danger mt-8">{error}</div>}
			<div className="mt-16">
				<button className="btn" type="submit">
					Login
				</button>
			</div>
		</form>
	);
}
