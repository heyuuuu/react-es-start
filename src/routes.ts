import React from "react"

const router: Array<RouteItem> = [
	{name: "home",path: "/home",component: React.lazy(() => import("src/pages/Manager"))},
	{name: "setting",path: "/setting",component: React.lazy(() => import("src/pages/Setting"))},
	// {name: "index",path: "/index",component: React.lazy(() => import("src/pages/Index"))},
	// {name: "home",path: "/home/:id",component: React.lazy(() => import("src/pages/Home"))}
]

export default router