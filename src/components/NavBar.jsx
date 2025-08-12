import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = ({ to, children }) => (
  <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
    {children}
  </NavLink>
)

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="text-lg font-semibold">Airport System</div>
        <nav className="flex gap-2">
          <Link to="/">Dashboard</Link>
          <Link to="/airports">Airports</Link>
          <Link to="/cities">Cities</Link>
          <Link to="/arrivals">Arrivals</Link>
          <Link to="/departures">Departures</Link>
          <Link to="/gates">Gates</Link>
          <Link to="/passengers">Passengers</Link>
          <Link to="/queries">Queries</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <div className="ml-auto text-xs badge">
          API: {import.meta.env.VITE_API_URL || '/api'}
        </div>
      </div>
    </header>
  )
}
