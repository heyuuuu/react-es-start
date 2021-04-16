import React from "react"
import { RouteItem } from "TYPES"

const routes: Array<RouteItem> = [
	{name: "manager", path: "/manager", component: React.lazy(() => import("src/pages/Manager"))},
	{name: "setting", path: "/setting", component: React.lazy(() => import("src/pages/Setting"))},
	{name: "progress", path: "/progress", component: React.lazy(() => import("src/pages/Progress"))},
]

export default routes