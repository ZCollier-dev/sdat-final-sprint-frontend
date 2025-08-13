import React from 'react'
import { useCrud, InlineEdit } from './_crud'

export default function ManageAirports(){
  const { rows, loading, error, form, onChange, create, update, remove } = useCrud('/airports')

  return (
    <div>
      <h2>Airports</h2>
      <form onSubmit={create} className="row controls mt-8">
        <label>Name <input className="input" name="name" value={form.name||''} onChange={onChange} required /></label>
        <label>Code <input className="input" name="code" value={form.code||''} onChange={onChange} required /></label>
        <label>City ID <input className="input" name="cityId" value={form.cityId||''} onChange={onChange} required /></label>
        <button className="btn" type="submit">Add Airport</button>
        {loading && <span className="badge">Working...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </form>

      <div className="card mt-16">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Name</th><th className="th">Code</th><th className="th">City ID</th><th className="th">Actions</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="td">{r.id}</td>
                <td className="td"><InlineEdit value={r.name} onSave={(v)=>update(r.id,{...r, name:v})} /></td>
                <td className="td"><InlineEdit value={r.code} onSave={(v)=>update(r.id,{...r, code:v})} /></td>
                <td className="td"><InlineEdit value={r.cityId} onSave={(v)=>update(r.id,{...r, cityId:v})} /></td>
                <td className="td"><button className="btn danger" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
