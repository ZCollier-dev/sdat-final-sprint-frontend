import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import RequireAuth from './components/RequireAuth'
import Dashboard from './pages/public/Dashboard'
import Arrivals from './pages/public/Arrivals'
import Departures from './pages/public/Departures'
import Gates from './pages/public/Gates'
import Airports from './pages/public/Airports'
import Cities from './pages/public/Cities'
import Passengers from './pages/public/Passengers'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageCities from './pages/admin/ManageCities'
import ManageAirports from './pages/admin/ManageAirports'
import ManagePassengers from './pages/admin/ManagePassengers'
import ManageFlights from './pages/admin/ManageFlights'

import Airlines from './pages/public/Airlines'
import Aircraft from './pages/public/Aircraft'
import Flights from './pages/public/Flights'   // <-- add this
import ManageGates from './pages/admin/ManageGates'
import ManageAirlines from './pages/admin/ManageAirlines'
import ManageAircraft from './pages/admin/ManageAircraft'
import ManageArrivals from './pages/admin/ManageArrivals'
import ManageDepartures from './pages/admin/ManageDepartures'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="arrivals" element={<Arrivals />} />
        <Route path="departures" element={<Departures />} />
        <Route path="gates" element={<Gates />} />
        <Route path="airports" element={<Airports />} />
        <Route path="cities" element={<Cities />} />
        <Route path="passengers" element={<Passengers />} />
        <Route path="aircraft" element={<Aircraft />} />
        <Route path="airlines" element={<Airlines />} />
        <Route path="flights" element={<Flights />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboard />} />
        <Route path="cities" element={<ManageCities />} />
        <Route path="airports" element={<ManageAirports />} />
        <Route path="passengers" element={<ManagePassengers />} />
        <Route path="flights" element={<ManageFlights />} />
        <Route path="departures" element={<ManageDepartures />} />
        <Route path="arrivals" element={<ManageArrivals />} />
        <Route path="aircraft" element={<ManageAircraft />} />
        <Route path="airlines" element={<ManageAirlines />} />
        <Route path="gates" element={<ManageGates />} />
      </Route>
    </Routes>
  )
}
