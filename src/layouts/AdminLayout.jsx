import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const A = ({to, children}) => (
  <NavLink to={to} className={({isActive}) => `link ${isActive ? 'active' : ''}`}>{children}</NavLink>
)
export default function AdminLayout(){
  const nav = useNavigate()
  function logout(){
    localStorage.removeItem('token')
    nav('/login')
  }
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <div className="brand">Admin</div>
          <A to="/admin">Overview</A>
          <A to="/admin/cities">Cities</A>
          <A to="/admin/airports">Airports</A>
          <A to="/admin/passengers">Passengers</A>
          <A to="/admin/flights">Flights</A>
          <button className="btn secondary right" onClick={logout}>Logout</button>
                  <A to="/admin/gates">Gates</A>
                    <A to="/admin/airlines">Airlines</A>
                    <A to="/admin/aircraft">Aircraft</A>
                    <A to="/admin/arrivals">Arrivals</A>
                    <A to="/admin/departures">Departures</A>
          </nav>
      </header>
      <main className="container"><Outlet /></main>
      <footer className="footer container">Admin Tools</footer>
    </div>
  )
}
