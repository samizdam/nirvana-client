import React, { lazy } from 'react'
import PrivateRouter from '../../../shared/HOC/PrivateRouter/PrivateRouter'
import { useCheckUser } from '../../../shared/hooks/useCheckUser'
import MainLayout from '../../layout/MainLayout/MainLayout'
const RadioPage = lazy(() => import('../../../pages/RadioPage/RadioPage'))
const TrackPage = lazy(() => import('../../../pages/TrackPage/TrackPage'))
const Error404 = lazy(() => import('../../../pages/Error404/Error404'))
const FavoritesPage = lazy(
	() => import('../../../pages/FavoritesPage/FavoritesPage')
)
const NAZRouter = lazy(() => import('../NAZRoutes/NAZRoutes'))
import AZLayout from '../../layout/AZLayout/AZLayout'
import { Route, Routes } from 'react-router-dom'

export default function MainRoutes() {
	const user = useCheckUser()

	return (
		<Routes>
			<Route path="/" element={<MainLayout user={user} />}>
				<Route
					element={
						<PrivateRouter isAllowed={user?.status === 'logged'} />
					}
				>
					<Route path="/" element={<AZLayout user={user} />}>
						<Route path="/radio" element={<RadioPage />} />
						<Route path="/favorites" element={<FavoritesPage />} />
						<Route path="/" element={<TrackPage />} />
					</Route>
				</Route>
				<Route path="/auth/*" element={<NAZRouter />} />
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	)
}
