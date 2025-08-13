import React from 'react'
import api from '../../api/client'

export function useCrud(basePath){
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

export function InlineEdit({ value, onSave }){
  const [v, setV] = React.useState(value)
  const [editing, setEditing] = React.useState(false)
  return editing ? (
    <span className="row">
      <input className="input" value={v ?? ''} onChange={e=>setV(e.target.value)} />
      <button className="btn" onClick={()=>{ setEditing(false); onSave(v) }}>Save</button>
      <button className="btn secondary" onClick={()=>{ setEditing(false); setV(value) }}>Cancel</button>
    </span>
  ) : (
    <span className="row">
      <span>{String(v ?? '')}</span>
      <button className="btn secondary" onClick={()=>setEditing(true)}>Edit</button>
    </span>
  )
}
