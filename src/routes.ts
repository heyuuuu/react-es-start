import React from "react"

const router: Array<RouteItem> = [
	{name: "home", path: "/home", component: React.lazy(() => import("src/pages/Manager"))},
	{name: "setting", path: "/setting", component: React.lazy(() => import("src/pages/Setting"))},
	{name: "progress", path: "/progress", component: React.lazy(() => import("src/pages/Progress"))},
]

export default router