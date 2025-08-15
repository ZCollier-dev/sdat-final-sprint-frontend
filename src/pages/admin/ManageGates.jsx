import React from "react";
import { useCrud, InlineEdit } from "./_crud.jsx";

export default function ManageGates() {
	const { rows, form, loading, error, onChange, create, update, remove } =
		useCrud("/gates");
	// id, gateNumber, airportId

	return (
		<div>
			<h2>Gates</h2>
			<form onSubmit={create} className="row controls mt-8">
				<label>
					Gate Number{" "}
					<input
						className="input"
						name="gateNumber"
						value={form.gateNumber || ""}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					Airport ID{" "}
					<input
						className="input"
						name="airportId"
						value={form.airportId || ""}
						onChange={onChange}
					/>
				</label>
				<button className="btn" type="submit">
					Add Gate
				</button>
				{loading && <span className="badge">Working...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</form>

			<div className="card mt-16">
				<table className="table">
					<thead>
						<tr>
							<th className="th">ID</th>
							<th className="th">Gate Number</th>
							<th className="th">Airport ID</th>
							<th className="th">Actions</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id}>
								<td className="td">{r.id}</td>
								<td className="td">
									<InlineEdit
										value={r.gateNumber}
										onSave={(v) => update(r.id, { ...r, gateNumber: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.airportId}
										onSave={(v) => update(r.id, { ...r, airportId: v })}
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
