import React from "react";
import api from "../../api/client";
import DataTable from "../../components/DataTable";

const columns = [
	{ key: "id", header: "ID" },
	{ key: "flightNumber", header: "Flight" },
	{ key: "fromAirport", header: "From" },
	{ key: "gate", header: "Gate" },
	{ key: "arrivalTime", header: "Time" },
];

export default function Arrivals() {
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	React.useEffect(() => {
		setLoading(true);
		api
			.get("/arrivals")
			.then((r) =>
				setRows(
					r.data.map((arrival) => ({
						id: arrival.id,
						flightNumber: arrival.flight.id,
						fromAirport: arrival.flight.departure.gate.airport.name,
						gate: arrival.gate.gateNumber,
						arrivalTime: arrival.arrivalTime,
					}))
				)
			)
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<div className="row controls">
				<h2>Arrivals</h2>
				{loading && <span className="badge">Loading...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</div>
			<div className="mt-16">
				<DataTable columns={columns} rows={rows} />
			</div>
		</div>
	);
}
