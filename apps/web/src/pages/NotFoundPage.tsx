import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FE] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-purple-100">
          <FileQuestion className="w-10 h-10 text-[#5D3FD3]" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Page not found</h2>
        <p className="text-slate-500 font-medium text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="w-full bg-[#5D3FD3] hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
