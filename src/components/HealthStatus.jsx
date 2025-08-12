import React from 'react'
import api from '../api/client'

export default function HealthStatus(){
  const [status, setStatus] = React.useState({ api: 'unknown', db: 'unknown' })
  const [detail, setDetail] = React.useState('')

  React.useEffect(()=>{
    async function check(){
      let apiOk = 'down', dbOk = 'unknown', det=''
      try{
        const r = await api.get('/airports')
        apiOk = Array.isArray(r.data) || r.status === 200 ? 'up' : 'degraded'
      }catch(e){
        apiOk = 'down'; det = e.message
      }
      try{
        const base = import.meta.env.VITE_API_URL || '/api'
        const res = await fetch(base + '/actuator/health')
        if(res.ok){
          const j = await res.json()
          dbOk = j?.components?.db?.status?.toLowerCase?.() || j?.status?.toLowerCase?.() || 'unknown'
        }
      }catch(e){}
      setStatus({ api: apiOk, db: dbOk })
      setDetail(det)
    }
    check()
  },[])

  const Pill = ({label, value}) => (
    <div className="badge">
      <span className="font-medium">{label}:</span>
      <span className={value==='up' ? 'text-green-400' : value==='degraded' ? 'text-yellow-400' : 'text-red-400'}>{value}</span>
    </div>
  )

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Pill label="API" value={status.api} />
      <Pill label="Database" value={status.db} />
      {detail && <div className="text-xs text-slate-400">({detail})</div>}
    </div>
  )
}
