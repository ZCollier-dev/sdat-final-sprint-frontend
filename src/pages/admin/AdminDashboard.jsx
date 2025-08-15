import React from "react";
import api from "../../api/client";

export default function AdminDashboard() {
	const [stats, setStats] = React.useState({
		airports: "-",
		cities: "-",
		passengers: "-",
	});
	React.useEffect(() => {
		Promise.all([
			api
				.get("/airports")
				.then((r) => r.data.length)
				.catch(() => "-"),
			api
				.get("/cities")
				.then((r) => r.data.length)
				.catch(() => "-"),
			api
				.get("/passengers")
				.then((r) => r.data.length)
				.catch(() => "-"),
		]).then(([a, c, p]) => setStats({ airports: a, cities: c, passengers: p }));
	}, []);
	return (
		<div className="grid">
			<div className="card" style={{ gridColumn: "span 4" }}>
				<h3>Airports</h3>
				<div className="stat">{stats.airports}</div>
			</div>
			<div className="card" style={{ gridColumn: "span 4" }}>
				<h3>Cities</h3>
				<div className="stat">{stats.cities}</div>
			</div>
			<div className="card" style={{ gridColumn: "span 4" }}>
				<h3>Passengers</h3>
				<div className="stat">{stats.passengers}</div>
			</div>
		</div>
	);
}
