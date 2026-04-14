import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"></div>
        <div className="absolute top-40 -right-16 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl"></div>
      </div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
