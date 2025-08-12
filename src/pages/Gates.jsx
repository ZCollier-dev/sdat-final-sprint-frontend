import React from 'react'
import api from '../api/client'
import DataTable from '../components/DataTable'

const columns = [{key:'id',header:'ID'},{key:'name',header:'Gate'},{key:'terminal',header:'Terminal'}]

export default function Gates() {
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    api.get('/gates')
      .then(res => setRows(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Gates</h1>
      {loading && <div className="badge">Loading...</div>}
      {error && <div className="badge">Error: {error}</div>}
      <DataTable columns={columns} rows={rows} />
    </div>
  )
}
