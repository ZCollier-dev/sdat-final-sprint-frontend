import React from 'react'
import { useCrud, InlineEdit } from './_crud.jsx'

export default function ManageAircraft(){
  const { rows, form, loading, error, onChange, create, update, remove } = useCrud('/aircraft')

  return (
    <div>
      <h2>Aircraft</h2>
      <form onSubmit={create} className="row controls mt-8">
        <label>Model <input className="input" name="model" value={form.model||''} onChange={onChange} required /></label>
        <label>Airline ID <input className="input" name="airlineId" value={form.airlineId||''} onChange={onChange}  /></label>
        <button className="btn" type="submit">Add Aircraft</button>
        {loading && <span className="badge">Working...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </form>

      <div className="card mt-16">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Model</th><th className="th">Airline ID</th><th className="th">Actions</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="td">{r.id}</td>
                <td className="td"><InlineEdit value={r.model} onSave={v=>update(r.id,{...r, model:v})} /></td>
                <td className="td"><InlineEdit value={r.airlineId} onSave={v=>update(r.id,{...r, airlineId:v})} /></td>
                <td className="td"><button className="btn danger" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
