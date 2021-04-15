declare module "TYPES" {
	import { RouteProps } from "react-router"

	export interface RouteItem extends RouteProps {
		name: string
		path: string
	}

	export interface RouteProp extends RouteProps {
		
	}
}