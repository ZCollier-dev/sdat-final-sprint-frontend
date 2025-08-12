import React from 'react'
import api from '../api/client'
import DataTable from '../components/DataTable'

function useCrud(basePath){
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [form, setForm] = React.useState({})

  const load = React.useCallback(()=>{
    setLoading(true); setError('')
    api.get(basePath)
      .then(res => setRows(res.data))
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(()=>setLoading(false))
  }, [basePath])

  React.useEffect(()=>{ load() }, [load])

  function onChange(e){ setForm(f => ({...f, [e.target.name]: e.target.value})) }

  async function create(e){
    e?.preventDefault?.()
    setLoading(true); setError('')
    try{ await api.post(basePath, form); setForm({}); load() }catch(err){ setError(err.response?.data?.message || err.message) }finally{ setLoading(false) }
  }
  async function update(id, patch){
    setLoading(true); setError('')
    try{ await api.put(`${basePath}/${id}`, patch); load() }catch(err){ setError(err.response?.data?.message || err.message) }finally{ setLoading(false) }
  }
  async function remove(id){
    if(!confirm('Delete record ' + id + '?')) return
    setLoading(true); setError('')
    try{ await api.delete(`${basePath}/${id}`); load() }catch(err){ setError(err.response?.data?.message || err.message) }finally{ setLoading(false) }
  }

  return { rows, loading, error, form, onChange, create, update, remove }
}

function InlineEdit({ value, onSave }){
  const [v, setV] = React.useState(value)
  const [editing, setEditing] = React.useState(false)
  return editing ? (
    <span className="flex gap-2">
      <input className="input" value={v ?? ''} onChange={e=>setV(e.target.value)} />
      <button className="btn" onClick={()=>{ setEditing(false); onSave(v) }}>Save</button>
      <button className="btn" onClick={()=>{ setEditing(false); setV(value) }}>Cancel</button>
    </span>
  ) : (
    <span className="flex gap-2 items-center">
      <span>{String(v ?? '')}</span>
      <button className="btn" onClick={()=>setEditing(true)}>Edit</button>
    </span>
  )
}

export function CitiesAdmin(){
  const { rows, loading, error, form, onChange, create, update, remove } = useCrud('/cities')
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Cities</h2>
      <form onSubmit={create} className="flex gap-2 items-end card p-3">
        <label className="flex flex-col gap-1"><span className="label">Name</span><input name="name" className="input" value={form.name||''} onChange={onChange} required/></label>
        <button className="btn" type="submit">Add City</button>
        {loading && <div className="badge">Working...</div>}
        {error && <div className="badge">Error: {error}</div>}
      </form>
      <div className="overflow-auto card p-3">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Name</th><th className="th">Actions</th></tr></thead>
          <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td className="td">{r.id}</td>
              <td className="td"><InlineEdit value={r.name} onSave={(v)=>update(r.id,{...r, name:v})} /></td>
              <td className="td"><button className="btn" onClick={()=>remove(r.id)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function AirportsAdmin(){
  const { rows, loading, error, form, onChange, create, update, remove } = useCrud('/airports')
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Airports</h2>
      <form onSubmit={create} className="flex flex-wrap gap-2 items-end card p-3">
        <label className="flex flex-col gap-1"><span className="label">Name</span><input name="name" className="input" value={form.name||''} onChange={onChange} required/></label>
        <label className="flex flex-col gap-1"><span className="label">Code</span><input name="code" className="input" value={form.code||''} onChange={onChange} required/></label>
        <label className="flex flex-col gap-1"><span className="label">City ID</span><input name="cityId" className="input" value={form.cityId||''} onChange={onChange} required/></label>
        <button className="btn" type="submit">Add Airport</button>
        {loading && <div className="badge">Working...</div>}
        {error && <div className="badge">Error: {error}</div>}
      </form>
      <div className="overflow-auto card p-3">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Name</th><th className="th">Code</th><th className="th">City ID</th><th className="th">Actions</th></tr></thead>
          <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td className="td">{r.id}</td>
              <td className="td"><InlineEdit value={r.name} onSave={(v)=>update(r.id,{...r, name:v})} /></td>
              <td className="td"><InlineEdit value={r.code} onSave={(v)=>update(r.id,{...r, code:v})} /></td>
              <td className="td"><InlineEdit value={r.cityId} onSave={(v)=>update(r.id,{...r, cityId:v})} /></td>
              <td className="td"><button className="btn" onClick={()=>remove(r.id)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function PassengersAdmin(){
  const { rows, loading, error, form, onChange, create, update, remove } = useCrud('/passengers')
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Passengers</h2>
      <form onSubmit={create} className="flex flex-wrap gap-2 items-end card p-3">
        <label className="flex flex-col gap-1"><span className="label">Name</span><input name="name" className="input" value={form.name||''} onChange={onChange} required/></label>
        <label className="flex flex-col gap-1"><span className="label">Email</span><input name="email" className="input" value={form.email||''} onChange={onChange} required/></label>
        <button className="btn" type="submit">Add Passenger</button>
        {loading && <div className="badge">Working...</div>}
        {error && <div className="badge">Error: {error}</div>}
      </form>
      <div className="overflow-auto card p-3">
        <table className="table">
          <thead><tr><th className="th">ID</th><th className="th">Name</th><th className="th">Email</th><th className="th">Actions</th></tr></thead>
          <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td className="td">{r.id}</td>
              <td className="td"><InlineEdit value={r.name} onSave={(v)=>update(r.id,{...r, name:v})} /></td>
              <td className="td"><InlineEdit value={r.email} onSave={(v)=>update(r.id,{...r, email:v})} /></td>
              <td className="td"><button className="btn" onClick={()=>remove(r.id)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function Admin(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-slate-400 text-sm">Edit database records directly. Actions call the backend REST endpoints.</p>
      <CitiesAdmin />
      <AirportsAdmin />
      <PassengersAdmin />
    </div>
  )
}
