import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/auth/Login";

const Dashboard = React.lazy(() => import("./pages/public/Dashboard"));
const Arrivals = React.lazy(() => import("./pages/public/Arrivals"));
const Departures = React.lazy(() => import("./pages/public/Departures"));
const Gates = React.lazy(() => import("./pages/public/Gates"));
const Airports = React.lazy(() => import("./pages/public/Airports"));
const Cities = React.lazy(() => import("./pages/public/Cities"));
const Passengers = React.lazy(() => import("./pages/public/Passengers"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const ManageCities = React.lazy(() => import("./pages/admin/ManageCities"));
const ManageAirports = React.lazy(() => import("./pages/admin/ManageAirports"));
const ManagePassengers = React.lazy(() =>
	import("./pages/admin/ManagePassengers")
);
const ManageFlights = React.lazy(() => import("./pages/admin/ManageFlights"));
const Airlines = React.lazy(() => import("./pages/public/Airlines"));
const Aircraft = React.lazy(() => import("./pages/public/Aircraft"));
const Flights = React.lazy(() => import("./pages/public/Flights"));
const ManageGates = React.lazy(() => import("./pages/admin/ManageGates"));
const ManageAirlines = React.lazy(() => import("./pages/admin/ManageAirlines"));
const ManageAircraft = React.lazy(() => import("./pages/admin/ManageAircraft"));
const ManageArrivals = React.lazy(() => import("./pages/admin/ManageArrivals"));
const ManageDepartures = React.lazy(() =>
	import("./pages/admin/ManageDepartures")
);
const LinkObjects = React.lazy(() => import("./pages/admin/LinkObjects"));

export default function App() {
	return (
		<Suspense>
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

				<Route
					path="/admin"
					element={
						<RequireAuth>
							<AdminLayout />
						</RequireAuth>
					}
				>
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
					<Route path="link" element={<LinkObjects />} />
				</Route>
			</Routes>
		</Suspense>
	);
}
