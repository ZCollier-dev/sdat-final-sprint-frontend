import React from "react";
import { useCrud, InlineEdit } from "./_crud.jsx";

export default function ManageArrivals() {
	const { rows, form, loading, error, onChange, create, update, remove } =
		useCrud("/arrivals");

	//add status

	return (
		<div>
			<h2>Arrivals</h2>
			<form onSubmit={create} className="row controls mt-8">
				<label>
					Flight ID{" "}
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
						name="arrivalTime"
						value={form.arrivalTime || ""}
						onChange={onChange}
					/>
				</label>
				<label>
					Status{" "}
					<input
						className="input"
						name="status"
						value={form.status || ""}
						onChange={onChange}
					/>
				</label>
				<button className="btn" type="submit">
					Add Arrivals
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
							<th className="th">Status</th>
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
										value={r.arrivalTime}
										onSave={(v) => update(r.id, { ...r, arrivalTime: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.status}
										onSave={(v) => update(r.id, { ...r, status: v })}
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
