import React from "react";
import api from "../../api/client";

/* Needs to link together Many to Many: L(managed/non-ignore) -> R(back/ignore)
	airport => aircraft
	passenger -> flight
	passenger -> airport
*/

export default function LinkObjects() {
	const [linkType, setLinkType] = React.useState("AirportAircraft");

	const [left, setLeft] = React.useState();

	const [right, setRight] = React.useState();

	const [error, setError] = React.useState("");

	async function submit(e) {
		e.preventDefault();
		setError("");
		try {
			switch (linkType) {
				case "AirportAircraft": {
					const { data } = await api.post(`/airports/link-aircraft/${left}`, {
						right,
					});
				}
				case "PassengerAirport": {
					const { data } = await api.post(`/passengers/link-airport/${left}`, {
						right,
					});
				}
				case "PassengerFlight": {
					const { data } = await api.post(`/passengers/link-flight/${left}`, {
						right,
					});
				}
				default: {
					setError("Invalid Link Type");
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || err.message || "Link failed");
		}
	}

	return (
		<div>
			<form onSubmit={submit} className="row controls mt-8">
				<label>
					Link Type{" "}
					<select
						className="input"
						name="linktype"
						id="linktype"
						value={linkType}
						onChange={(e) => setLinkType(e.target.value)}
					>
						<option value="AirportAircraft">Airport - Aircraft</option>
						<option value="PassengerAirport">Passenger - Airport</option>
						<option value="PassengerFlight">Passenger - Flight</option>
					</select>
				</label>
				<label>
					Left Side{" "}
					<input
						type="number"
						className="input"
						name="left"
						value={left}
						onChange={(e) => setLeft(() => e.target.value)}
						required
					/>
				</label>
				<label>
					Right Side{" "}
					<input
						type="number"
						className="input"
						name="right"
						value={right}
						onChange={(e) => setRight(() => e.target.value)}
						required
					/>
				</label>
				<button className="btn" type="submit">
					Link
				</button>
			</form>
			{error && <div className="badge danger mt-8">{error}</div>}
		</div>
	);
}
