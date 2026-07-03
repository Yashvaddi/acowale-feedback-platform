import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare } from 'lucide-react';
import { cn } from '../utils/cn';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: MessageSquare, label: 'Feedback', path: '/admin/feedback' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2 mb-2">
          <div className="flex space-x-[2px] items-end">
            <div className="w-2.5 h-3.5 rounded-full bg-[#5D3FD3]"></div>
            <div className="w-2.5 h-5 rounded-full bg-[#5D3FD3] opacity-80"></div>
            <div className="w-2.5 h-6 rounded-full bg-[#5D3FD3] opacity-40"></div>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Acodash</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer",
                  isActive 
                    ? "bg-[#F3F0FF] text-[#5D3FD3]" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div></div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogout} title="Click to Logout">
              <div className="w-9 h-9 rounded-full bg-[#5D3FD3] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Admin</p>
                <p className="text-[11px] font-medium text-slate-500">Log out</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Body */}
        <div className="flex-1 p-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
