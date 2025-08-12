import React from 'react'
import api from '../api/client'
import HealthStatus from '../components/HealthStatus'
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

  function bucketByHour(items){
    const map = {}
    for(const it of items){
      const t = it.time || it.scheduledTime || it.departureTime || it.arrivalTime
      if(!t) continue
      const d = new Date(t)
      const label = isNaN(d.getTime()) ? String(t).slice(0,13) : d.toISOString().slice(0,13)+':00'
      map[label] = (map[label]||0)+1
    }
    return Object.keys(map).sort().map(k=>({ time:k, count: map[k] }))
  }
  const arrivalsSeries = bucketByHour(arrivals)
  const departuresSeries = bucketByHour(departures)

  const Stat = ({title, value}) => (
    <div className="card p-5">
      <div className="text-slate-300 text-sm">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">System Overview</h1>
        <HealthStatus />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat title="Airports" value={airports.length} />
        <Stat title="Cities" value={cities.length} />
        <Stat title="Flights (arrivals+departures)" value={(arrivals.length||0)+(departures.length||0)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <div className="text-sm mb-2 text-slate-300">Airports per City</div>
          <div style={{width:'100%', height:300}}>
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

        <div className="card p-4">
          <div className="text-sm mb-2 text-slate-300">Flights per Hour (Arrivals)</div>
          <div style={{width:'100%', height:300}}>
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

        <div className="card p-4 lg:col-span-2">
          <div className="text-sm mb-2 text-slate-300">Flights per Hour (Departures)</div>
          <div style={{width:'100%', height:300}}>
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
    </div>
  )
}
