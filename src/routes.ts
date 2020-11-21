import React from "react"

const router: Array<RouteItem> = [
	{name: "home",path: "/home",component: React.lazy(() => import("src/pages/home"))}
]

export default router