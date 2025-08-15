import React from "react";
import { useCrud, InlineEdit } from "./_crud";

export default function ManageFlights() {
	const { rows, loading, error, form, onChange, create, update, remove } =
		useCrud("/flights");

	//Remove Flight, From, To, Gate, Time
	//Add Departure ID, Arrival ID

	return (
		<div>
			<h2>Flights</h2>
			<form onSubmit={create} className="row controls mt-8">
				<label>
					Departure ID{" "}
					<input
						className="input"
						name="departureId"
						value={form.departureId || ""}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					Arrival ID{" "}
					<input
						className="input"
						name="arrivalId"
						value={form.arrivalId || ""}
						onChange={onChange}
					/>
				</label>
				<label>
					Aircraft ID{" "}
					<input
						className="input"
						name="aircraftId"
						value={form.aircraftId || ""}
						onChange={onChange}
					/>
				</label>
				<button className="btn" type="submit">
					Add Flight
				</button>
				{loading && <span className="badge">Working...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</form>

			<div className="card mt-16">
				<table className="table">
					<thead>
						<tr>
							<th className="th">ID</th>
							<th className="th">Departure ID</th>
							<th className="th">Arrival ID</th>
							<th className="th">Aircraft ID</th>
							<th className="th">Actions</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id}>
								<td className="td">{r.id}</td>
								<td className="td">
									<InlineEdit
										value={r.departureId}
										onSave={(v) => update(r.id, { ...r, departureId: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.arrivalId}
										onSave={(v) => update(r.id, { ...r, arrivalId: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.aircraftId}
										onSave={(v) => update(r.id, { ...r, aircraftId: v })}
									/>
								</td>
								<td className="td">
									<button className="btn danger" onClick={() => remove(r.id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
