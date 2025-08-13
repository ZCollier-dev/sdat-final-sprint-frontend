import React from 'react'
import { useCrud, InlineEdit } from './_crud.jsx'

export default function ManageArrivals(){
  const { rows, form, loading, error, onChange, create, update, remove } = useCrud('/arrivals')

  return (
    <div>
      <h2>Arrivals</h2>
      <form onSubmit={create} className="row controls mt-8">
        <label>Flight # <input className="input" name="flightNumber" value={form.flightNumber||''} onChange={onChange} required /></label>
        <label>From <input className="input" name="fromAirport" value={form.fromAirport||''} onChange={onChange}  /></label>
        <label>Gate <input className="input" name="gate" value={form.gate||''} onChange={onChange}  /></label>
        <label>Time <input className="input" name="time" value={form.time||''} onChange={onChange}  /></label>
        <button className="btn" type="submit">Add Arrivals</button>
        {loading && <span className="badge">Working...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </form>

      <div className="card mt-16">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Flight</th><th className="th">From</th><th className="th">Gate</th><th className="th">Time</th><th className="th">Actions</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="td">{r.id}</td>
                <td className="td"><InlineEdit value={r.flightNumber} onSave={v=>update(r.id,{...r, flightNumber:v})} /></td>
                <td className="td"><InlineEdit value={r.fromAirport} onSave={v=>update(r.id,{...r, fromAirport:v})} /></td>
                <td className="td"><InlineEdit value={r.gate} onSave={v=>update(r.id,{...r, gate:v})} /></td>
                <td className="td"><InlineEdit value={r.time} onSave={v=>update(r.id,{...r, time:v})} /></td>
                <td className="td"><button className="btn danger" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
