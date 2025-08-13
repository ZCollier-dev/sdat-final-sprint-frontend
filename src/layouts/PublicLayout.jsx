import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const A = ({to, children}) => (
  <NavLink to={to} className={({isActive}) => `link ${isActive ? 'active' : ''}`}>{children}</NavLink>
)

export default function PublicLayout(){
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <div className="brand">Airport System</div>
          <A to="/">Dashboard</A>
          <A to="/arrivals">Arrivals</A>
          <A to="/departures">Departures</A>
          <A to="/gates">Gates</A>
          <A to="/airports">Airports</A>
          <A to="/cities">Cities</A>
          <A to="/passengers">Passengers</A>
          <A to="/queries">Queries</A>
          <A to="/aircraft">Aircraft</A>
          <A to="/airlines">Airlines</A>
          <A to="/flights">Flights</A>
          <div className="right"><A to="/login">Admin</A></div>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
      <footer className="footer container">API: {import.meta.env.VITE_API_URL || '/api'}</footer>
    </div>
  )
}
