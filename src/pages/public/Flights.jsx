import React from "react";
import api from "../../api/client";
import DataTable from "../../components/DataTable";

const columns = [
	{ key: "id", header: "ID" },
	{ key: "fromAirport", header: "From" },
	{ key: "fromGate", header: "Gate" },
	{ key: "departureTime", header: "Time" },
	{ key: "toAirport", header: "To" },
	{ key: "toGate", header: "Gate" },
	{ key: "arrivalTime", header: "Time" },
];

export default function Flights() {
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	React.useEffect(() => {
		setLoading(true);
		api
			.get("/flights")
			.then((r) =>
				setRows(
					r.data.map((flight) => ({
						id: flight.id,
						fromAirport: flight.departure.gate.airport.name,
						fromGate: flight.departure.gate.gateNumber,
						departureTime: flight.departure.departureTime,
						toAirport: flight.arrival.gate.airport.name,
						toGate: flight.arrival.gate.gateNumber,
						arrivalTime: flight.arrival.arrivalTime,
					}))
				)
			)
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<div className="row controls">
				<h2>Flights</h2>
				{loading && <span className="badge">Loading...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</div>
			<div className="mt-16">
				<DataTable columns={columns} rows={rows} />
			</div>
		</div>
	);
}
