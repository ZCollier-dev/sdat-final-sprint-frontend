import React from 'react'
import { useCrud, InlineEdit } from './_crud.jsx'

export default function ManageGates(){
  const { rows, form, loading, error, onChange, create, update, remove } = useCrud('/gates')

  return (
    <div>
      <h2>Gates</h2>
      <form onSubmit={create} className="row controls mt-8">
        <label>Name <input className="input" name="name" value={form.name||''} onChange={onChange} required /></label>
        <label>Terminal <input className="input" name="terminal" value={form.terminal||''} onChange={onChange}  /></label>
        <button className="btn" type="submit">Add Gates</button>
        {loading && <span className="badge">Working...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </form>

      <div className="card mt-16">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Gate</th><th className="th">Terminal</th><th className="th">Actions</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="td">{r.id}</td>
                <td className="td"><InlineEdit value={r.name} onSave={v=>update(r.id,{...r, name:v})} /></td>
                <td className="td"><InlineEdit value={r.terminal} onSave={v=>update(r.id,{...r, terminal:v})} /></td>
                <td className="td"><button className="btn danger" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
