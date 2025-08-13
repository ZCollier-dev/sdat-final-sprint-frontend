import React from 'react'
import api from '../../api/client'
import DataTable from '../../components/DataTable'

const columns = [{key:'id',header:'ID'},{key:'flightNumber',header:'Flight'},{key:'fromAirport',header:'From'},{key:'toAirport',header:'To'},{key:'gate',header:'Gate'},{key:'time',header:'Time'}]

export default function Flights() {
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(()=>{
    setLoading(true)
    api.get('/flights').then(r=>setRows(r.data)).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  },[])

  return (
    <div>
      <div className="row controls">
        <h2>Flights</h2>
        {loading && <span className="badge">Loading...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </div>
      <div className="mt-16">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  )
}
