import Nav from "react-router-nav"
import Routes from "../routes"
import { createHashHistory } from "history"
const H = createHashHistory()
const Navigation = new Nav(H,Routes)

export default Navigation
export { H , Routes}