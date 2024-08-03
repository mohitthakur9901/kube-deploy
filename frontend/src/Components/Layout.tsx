import { Outlet } from "react-router-dom"
import AppBar from "./AppBar"
import Footer from "./Footer"

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
        <AppBar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
    )
}

export default Layout