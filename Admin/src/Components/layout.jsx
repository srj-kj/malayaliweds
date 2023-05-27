import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useMediaQuery } from 'react-responsive'
const Layout = () => {
  const isNonMobile = useMediaQuery({
    query: '(min-width: 600px)'
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-x-hidden">
  <Sidebar
    className="md:w-64 bg-gray-800 text-gray-100"
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
  />
  <div className="flex-grow">
    <Navbar
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
    <Outlet />
  </div>
</div>
  )
}

export default Layout