import React from "react";
import api from "../../api/client";

// Recursively flatten nested {id} objects → xxxId fields
function flattenRow(obj, parentKey = "", result = {}) {
	Object.entries(obj || {}).forEach(([key, value]) => {
		const newKey = parentKey ? `${parentKey}.${key}` : key;

		if (value && typeof value === "object" && !Array.isArray(value)) {
			// If it's an object with only an id, create a shortcut xxxId field
			if ("id" in value && Object.keys(value).length > 1) {
				// Keep full object
				result[newKey] = value;
				result[`${newKey}Id`] = value.id;
			} else if ("id" in value) {
				// Object is just { id: ... }
				result[`${newKey}Id`] = value.id;
			} else {
				// Keep recursing
				flattenRow(value, newKey, result);
			}
		} else {
			result[newKey] = value;
		}
	});
	return result;
}

// Recursively unflatten xxxId keys → nested objects
function unflattenRow(obj) {
	const result = { ...obj };

	Object.keys(obj).forEach((key) => {
		if (key.endsWith("Id")) {
			const basePath = key.slice(0, -2); // remove 'Id'
			const segments = basePath.split(".");

			// Build nested object path for basePath
			let current = result;
			for (let i = 0; i < segments.length - 1; i++) {
				if (!current[segments[i]] || typeof current[segments[i]] !== "object") {
					current[segments[i]] = {};
				}
				current = current[segments[i]];
			}

			// Last segment becomes { id: value }
			current[segments[segments.length - 1]] = { id: obj[key] };

			// Remove the xxxId key
			delete result[key];
		}
	});

	return result;
}

export function useCrud(basePath) {
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [form, setForm] = React.useState({});

	const load = React.useCallback(() => {
		setLoading(true);
		setError("");
		api
			.get(basePath)
			.then((res) => {
				const flatRows = res.data.map((row) => flattenRow(row));
				setRows(flatRows);
			})
			.catch((err) => setError(err.response?.data?.message || err.message))
			.finally(() => setLoading(false));
	}, [basePath]);

	React.useEffect(() => {
		load();
	}, [load]);

	function onChange(e) {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	}

	async function create(e) {
		e?.preventDefault?.();
		setLoading(true);
		setError("");
		try {
			await api.post(basePath, unflattenRow(form));
			setForm({});
			load();
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	}

	async function update(id, patch) {
		setLoading(true);
		setError("");
		try {
			await api.put(`${basePath}/${id}`, unflattenRow(patch));
			load();
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	}

	async function remove(id) {
		if (!confirm("Delete record " + id + "?")) return;
		setLoading(true);
		setError("");
		try {
			await api.delete(`${basePath}/${id}`);
			load();
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	}

	return { rows, loading, error, form, onChange, create, update, remove };
}

export function InlineEdit({ value, onSave }) {
	const [v, setV] = React.useState(value);
	const [editing, setEditing] = React.useState(false);
	return editing ? (
		<span className="row">
			<input
				className="input"
				value={v ?? ""}
				onChange={(e) => setV(e.target.value)}
			/>
			<button
				className="btn"
				onClick={() => {
					setEditing(false);
					onSave(v);
				}}
			>
				Save
			</button>
			<button
				className="btn secondary"
				onClick={() => {
					setEditing(false);
					setV(value);
				}}
			>
				Cancel
			</button>
		</span>
	) : (
		<span className="row">
			<span>{String(v ?? "")}</span>
			<button className="btn secondary" onClick={() => setEditing(true)}>
				Edit
			</button>
		</span>
	);
}
