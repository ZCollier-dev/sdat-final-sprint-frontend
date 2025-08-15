import React from "react";
import { useCrud, InlineEdit } from "./_crud.jsx";

export default function ManageDepartures() {
	const { rows, form, loading, error, onChange, create, update, remove } =
		useCrud("/departures");

	return (
		<div>
			<h2>Departures</h2>
			<form onSubmit={create} className="row controls mt-8">
				<label>
					Flight #{" "}
					<input
						className="input"
						name="flightId"
						value={form.flightId || ""}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					Gate ID{" "}
					<input
						className="input"
						name="gateId"
						value={form.gateId || ""}
						onChange={onChange}
					/>
				</label>
				<label>
					Time{" "}
					<input
						className="input"
						name="departureTime"
						value={form.departureTime || ""}
						onChange={onChange}
					/>
				</label>
				<button className="btn" type="submit">
					Add Departures
				</button>
				{loading && <span className="badge">Working...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</form>

			<div className="card mt-16">
				<table className="table">
					<thead>
						<tr>
							<th className="th">ID</th>
							<th className="th">Flight ID</th>
							<th className="th">Gate ID</th>
							<th className="th">Time</th>
							<th className="th">Actions</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id}>
								<td className="td">{r.id}</td>
								<td className="td">
									<InlineEdit
										value={r.flightId}
										onSave={(v) => update(r.id, { ...r, flightId: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.gateId}
										onSave={(v) => update(r.id, { ...r, gateId: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.departureTime}
										onSave={(v) => update(r.id, { ...r, departureTime: v })}
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
