import { useState } from 'react'
// 1. Import icon yang dibutuhkan dari lucide-react
import { LayoutDashboard, Users, ShoppingBag, Settings, Bell, Menu, TrendingUp, TrendingDown } from 'lucide-react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* SIDEBAR */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider">
            ADMIN<span className="text-blue-500">UI</span>
          </h1>
        </div>
        <nav className="p-4 space-y-2 mt-4">
          {/* 2. Gunakan icon dan atur flex agar sejajar dengan teks */}
          <a href="#" className="flex items-center py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Users
          </a>
          <a href="#" className="flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5 mr-3" />
            Products
          </a>
          <a href="#" className="flex items-center py-2.5 px-4 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {/* Icon Hamburger Menu pengganti SVG */}
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block ml-2">Overview</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-blue-600 transition-colors relative">
              {/* Icon Notifikasi */}
              <Bell className="w-5 h-5" />
              {/* Titik merah notifikasi */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
              <div className="w-9 h-9 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Total Users</div>
                  <div className="text-3xl font-bold text-gray-800">1,245</div>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="text-green-500 text-sm mt-4 font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> 12% 
                <span className="text-gray-400 font-normal ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Total Revenue</div>
                  <div className="text-3xl font-bold text-gray-800">$34,500</div>
                </div>
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>
              <div className="text-green-500 text-sm mt-4 font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> 8.5% 
                <span className="text-gray-400 font-normal ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Active Sessions</div>
                  <div className="text-3xl font-bold text-gray-800">432</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
              </div>
              <div className="text-red-500 text-sm mt-4 font-medium flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" /> 2.1% 
                <span className="text-gray-400 font-normal ml-2">vs last month</span>
              </div>
            </div>
          </div>

          {/* ... (Tabel kode sama seperti sebelumnya, tidak ada icon yang diubah di tabel) ... */}
          
        </main>
      </div>
    </div>
  )
}

export default App