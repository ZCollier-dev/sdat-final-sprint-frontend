import React from 'react'
import api from '../../api/client'
import DataTable from '../../components/DataTable'

const Q = [
  { key:'airportsByCity', label:'Airports by City', endpoint:(p)=>`/airports/city/${encodeURIComponent(p.q||'')}`,
    fields:[{name:'q',label:'City ID or Name', placeholder:`e.g. 1 or St. John's`}],
    columns:[{key:'id',header:'ID'},{key:'name',header:'Name'},{key:'code',header:'Code'}] },
  { key:'airportsByPassenger', label:'Airports by Passenger', endpoint:(p)=>`/airports/passenger/${encodeURIComponent(p.q||'')}`,
    fields:[{name:'q',label:'Passenger ID', placeholder:'e.g. 42'}],
    columns:[{key:'id',header:'ID'},{key:'name',header:'Name'},{key:'code',header:'Code'}] },
  { key:'airportsByAircraft', label:'Airports by Aircraft', endpoint:(p)=>`/airports/aircraft/${encodeURIComponent(p.q||'')}`,
    fields:[{name:'q',label:'Aircraft ID or Model', placeholder:'e.g. 737'}],
    columns:[{key:'id',header:'ID'},{key:'name',header:'Name'},{key:'code',header:'Code'}] },
  { key:'passengersByAirport', label:'Passengers by Airport', endpoint:(p)=>`/passengers/airport/${encodeURIComponent(p.q||'')}`,
    fields:[{name:'q',label:'Airport ID or Code', placeholder:'e.g. YYZ'}],
    columns:[{key:'id',header:'ID'},{key:'name',header:'Name'},{key:'email',header:'Email'}] },
]

export default function Queries(){
  const [which, setWhich] = React.useState(Q[0].key)
  const [params, setParams] = React.useState({})
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const cfg = Q.find(x=>x.key===which)

  function onChange(e){ setParams(p => ({...p, [e.target.name]: e.target.value})) }

  async function run(e){
    e.preventDefault(); setLoading(true); setError('')
    try{
      const url = cfg.endpoint(params)
      const { data } = await api.get(url)
      setRows(Array.isArray(data) ? data : (data?.content ?? []))
    }catch(err){ setError(err.response?.data?.message || err.message) }
    finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <div className="row controls">
        <h2>Prebuilt Queries</h2>
        {loading && <span className="badge">Loading...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </div>
      <div className="mt-8 row controls">
        <label>Query 
          <select className="input" value={which} onChange={(e)=>setWhich(e.target.value)}>
            {Q.map(q=> <option key={q.key} value={q.key}>{q.label}</option>)}
          </select>
        </label>
        {cfg.fields.map(f => (
          <label key={f.name}>{f.label}<input name={f.name} className="input" placeholder={f.placeholder} onChange={onChange} /></label>
        ))}
        <button className="btn" onClick={run}>Run</button>
      </div>
      <div className="mt-16"><DataTable columns={cfg.columns} rows={rows} /></div>
    </div>
  )
}
