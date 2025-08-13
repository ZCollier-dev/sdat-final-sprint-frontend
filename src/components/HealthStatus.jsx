import React from 'react'
import api from '../api/client'
export default function HealthStatus(){
  const [apiStatus, setApi] = React.useState('checking')
  const [dbStatus, setDb] = React.useState('unknown')
  React.useEffect(()=>{
    (async ()=>{
      try{ await api.get('/airports'); setApi('up') }catch{ setApi('down') }
      try{
        const base = import.meta.env.VITE_API_URL || '/api'
        const r = await fetch(base + '/actuator/health')
        if(r.ok){ const j = await r.json(); setDb(j?.components?.db?.status?.toLowerCase?.() || 'up') }
      }catch{}
    })()
  },[])
  return (
    <div className="row">
      <div className="badge">API: <b className={apiStatus==='up'?'success':'danger'}>{apiStatus}</b></div>
      <div className="badge">DB: <b className={dbStatus==='up'?'success':'warning'}>{dbStatus}</b></div>
    </div>
  )
}
