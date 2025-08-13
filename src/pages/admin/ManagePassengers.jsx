import React from 'react'
import { useCrud, InlineEdit } from './_crud'

export default function ManagePassengers(){
  const { rows, loading, error, form, onChange, create, update, remove } = useCrud('/passengers')

  return (
    <div>
      <h2>Passengers</h2>
      <form onSubmit={create} className="row controls mt-8">
        <label>Name <input className="input" name="name" value={form.name||''} onChange={onChange} required /></label>
        <label>Email <input className="input" name="email" value={form.email||''} onChange={onChange} required /></label>
        <button className="btn" type="submit">Add Passenger</button>
        {loading && <span className="badge">Working...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </form>

      <div className="card mt-16">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Name</th><th className="th">Email</th><th className="th">Actions</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="td">{r.id}</td>
                <td className="td"><InlineEdit value={r.name} onSave={(v)=>update(r.id,{...r, name:v})} /></td>
                <td className="td"><InlineEdit value={r.email} onSave={(v)=>update(r.id,{...r, email:v})} /></td>
                <td className="td"><button className="btn danger" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
