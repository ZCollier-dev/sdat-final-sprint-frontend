import React from 'react'
import api from '../../api/client'
import DataTable from '../../components/DataTable'

const columns = [{key:'id',header:'ID'},{key:'name',header:'Name'},{key:'code',header:'Code'},{key:'cityId',header:'City ID'}]

export default function Airports() {
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(()=>{
    setLoading(true)
    api.get('/airports').then(r=>setRows(r.data)).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  },[])

  return (
    <div>
      <div className="row controls">
        <h2>Airports</h2>
        {loading && <span className="badge">Loading...</span>}
        {error && <span className="badge danger">Error: {error}</span>}
      </div>
      <div className="mt-16">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  )
}
