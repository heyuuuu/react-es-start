import React from "react"

const router: Array<RouteItem> = [
	{name: "home",path: "/home",component: React.lazy(() => import("src/pages/home"))},
	{name: "homes",path: "/home/:id",component: React.lazy(() => import("src/pages/home"))}
]

export default router