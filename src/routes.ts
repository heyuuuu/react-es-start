import React from "react"

const router: Array<RouteItem> = [
	{name: "home",path: "/home",component: React.lazy(() => import("src/pages/Manager"))},
	{name: "setting",path: "/setting",component: React.lazy(() => import("src/pages/Setting"))}
]

export default router