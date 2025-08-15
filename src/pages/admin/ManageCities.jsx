import React from "react";
import { useCrud, InlineEdit } from "./_crud";

export default function ManageCities() {
	const { rows, loading, error, form, onChange, create, update, remove } =
		useCrud("/cities");

	//add state, population

	return (
		<div>
			<h2>Cities</h2>
			<form onSubmit={create} className="row controls mt-8">
				<label>
					Name{" "}
					<input
						className="input"
						name="name"
						value={form.name || ""}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					State/Province{" "}
					<input
						className="input"
						name="state"
						value={form.state || ""}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					Population{" "}
					<input
						className="input"
						name="population"
						value={form.population || ""}
						onChange={onChange}
						required
					/>
				</label>
				<button className="btn" type="submit">
					Add City
				</button>
				{loading && <span className="badge">Working...</span>}
				{error && <span className="badge danger">Error: {error}</span>}
			</form>

			<div className="card mt-16">
				<table className="table">
					<thead>
						<tr>
							<th className="th">ID</th>
							<th className="th">Name</th>
							<th className="th">State/Province</th>
							<th className="th">Population</th>
							<th className="th">Actions</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id}>
								<td className="td">{r.id}</td>
								<td className="td">
									<InlineEdit
										value={r.name}
										onSave={(v) => update(r.id, { ...r, name: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.state}
										onSave={(v) => update(r.id, { ...r, state: v })}
									/>
								</td>
								<td className="td">
									<InlineEdit
										value={r.population}
										onSave={(v) => update(r.id, { ...r, population: v })}
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
