import React from "react"

const router: Array<RouteItem> = [
	{name: "index",path: "/index",component: React.lazy(() => import("src/pages/Index"))},
	{name: "home",path: "/home/:id",component: React.lazy(() => import("src/pages/Home"))}
]

export default router