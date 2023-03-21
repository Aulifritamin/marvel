import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

import Spinner from '../Spinner/Spinner';
import SingleCharPage from "../pages/SingleCharPage";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const AnimatedSwitch = () => {

	const location = useLocation();


	return (
		<div className="app">
			<AppHeader />
			<main>
				<Suspense fallback={<Spinner />}>
					<Routes location={location}>
						<Route path="/" element={<MainPage />} />
						<Route path="/comics" element={<ComicsPage />} />
						<Route path="/comics/:comicId" element={<SingleComicPage />} />
						<Route path="/characters/:charId" element={<SingleCharPage />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Suspense>
			</main>
		</div>
	)
}

export default function App() {
	return (
		<BrowserRouter>
			<AnimatedSwitch />
		</BrowserRouter>
	)
}
