import React from 'react'
import api from '../../api/client'
import HealthStatus from '../../components/HealthStatus'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts'

export default function Dashboard(){
  const [airports, setAirports] = React.useState([])
  const [cities, setCities] = React.useState([])
  const [arrivals, setArrivals] = React.useState([])
  const [departures, setDepartures] = React.useState([])

  React.useEffect(()=>{
    Promise.all([
      api.get('/airports').catch(()=>({data:[]})),
      api.get('/cities').catch(()=>({data:[]})),
      api.get('/arrivals').catch(()=>({data:[]})),
      api.get('/departures').catch(()=>({data:[]})),
    ]).then(([a,c,ar,de]) => {
      setAirports(a.data||[]); setCities(c.data||[])
      setArrivals(ar.data||[]); setDepartures(de.data||[])
    })
  },[])

  const airportsPerCity = Object.values((airports||[]).reduce((acc,a)=>{
    const key = a.cityName || a.city || a.cityId || 'Unknown'
    const name = typeof key === 'number' ? `City ${key}` : key
    acc[name] = acc[name] || { name, airports: 0 }
    acc[name].airports += 1
    return acc
  }, {}))

  const bucket = (items) => {
    const m = {}
    for(const it of items){
      const t = it.time || it.scheduledTime || it.departureTime || it.arrivalTime
      if(!t) continue
      const d = new Date(t); const k = isNaN(d) ? String(t).slice(0,13) : d.toISOString().slice(0,13)
      m[k] = (m[k]||0)+1
    }
    return Object.entries(m).sort((a,b)=>a[0].localeCompare(b[0])).map(([time,count])=>({time, count}))
  }
  const arrivalsSeries = bucket(arrivals)
  const departuresSeries = bucket(departures)

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 12'}}><HealthStatus /></div>
      <div className="card" style={{gridColumn:'span 4'}}><h3>Airports</h3><div className="stat">{airports.length}</div></div>
      <div className="card" style={{gridColumn:'span 4'}}><h3>Cities</h3><div className="stat">{cities.length}</div></div>
      <div className="card" style={{gridColumn:'span 4'}}><h3>Flights</h3><div className="stat">{(arrivals.length||0)+(departures.length||0)}</div></div>

      <div className="card" style={{gridColumn:'span 6'}}>
        <h3>Airports per City</h3>
        <div className="chart">
          <ResponsiveContainer>
            <BarChart data={airportsPerCity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide={airportsPerCity.length>8} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="airports" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{gridColumn:'span 6'}}>
        <h3>Arrivals per Hour</h3>
        <div className="chart">
          <ResponsiveContainer>
            <LineChart data={arrivalsSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" hide />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{gridColumn:'span 12'}}>
        <h3>Departures per Hour</h3>
        <div className="chart">
          <ResponsiveContainer>
            <LineChart data={departuresSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" hide />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
