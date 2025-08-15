import React from "react";
export default function DataTable({ columns, rows, keyField = "id" }) {
	return (
		<div className="card">
			<table className="table">
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col.key} className="th">
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{!rows || rows.length === 0 ? (
						<tr>
							<td className="td" colSpan={columns.length}>
								No data
							</td>
						</tr>
					) : (
						rows.map((row, i) => (
							<tr key={row[keyField] ?? i}>
								{columns.map((col) => (
									<td key={col.key} className="td">
										{String(row[col.key] ?? "")}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
