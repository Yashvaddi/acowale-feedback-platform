import FeedbackForm from '../components/FeedbackForm';
import { Info, Sparkles } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans flex flex-col">
      {/* Header - Full Width */}
      <header className="w-full px-6 py-5 flex justify-between items-center bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-2.5">
          {/* Logo Graphic */}
          <div className="flex space-x-[3px] items-end">
            <div className="w-2.5 h-3.5 rounded-full bg-[#5D3FD3]"></div>
            <div className="w-2.5 h-5 rounded-full bg-[#5D3FD3] opacity-80"></div>
            <div className="w-2.5 h-6 rounded-full bg-[#5D3FD3] opacity-40"></div>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Acowale <span className="text-[#5D3FD3]">Feedback</span>
          </h1>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          About Acowale
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center">
        
        {/* Title Area */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-[2.2rem] sm:text-[2.5rem] font-extrabold text-slate-900 tracking-tight mb-2 flex items-center justify-center gap-3">
            We value <span className="text-[#5D3FD3]">your feedback</span>
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#5D3FD3]" />
          </h2>
          <p className="text-slate-700 font-bold text-[15px] sm:text-[16px]">
            Help us improve by sharing your experience.
          </p>
        </div>

        {/* Decorative Graphic */}
        <div className="relative w-full h-24 mx-auto mb-6 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-blue-50 rounded-full blur-3xl opacity-70"></div>
          
          {/* Main Bubble */}
          <div className="relative w-36 h-20 bg-gradient-to-br from-[#7B5EFA] to-[#5D3FD3] rounded-[1.2rem] shadow-xl flex items-center justify-center transform -rotate-3 z-10 border-4 border-white/20">
             <div className="flex gap-2">
                <span className="text-white text-xl shadow-sm">★</span>
                <span className="text-white text-xl shadow-sm">★</span>
                <span className="text-white text-xl shadow-sm">★</span>
             </div>
             {/* Bubble Tail */}
             <div className="absolute -bottom-3 right-6 w-6 h-6 bg-[#5D3FD3] rotate-45 rounded-sm"></div>
          </div>

          {/* Background Highlight */}
          <div className="absolute top-2 left-1/2 -ml-24 w-12 h-12 bg-white/40 rounded-full blur-md"></div>
          
          {/* Floating Stars */}
          <span className="absolute top-0 left-1/4 text-purple-300 text-lg">✦</span>
          <span className="absolute bottom-4 left-1/3 text-purple-200 text-sm">✦</span>
          <span className="absolute top-6 right-1/4 text-indigo-200 text-sm">✦</span>
        </div>

        {/* Form component - Centered in a white card */}
        <div className="w-full max-w-[42rem] bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 relative overflow-hidden">
          <FeedbackForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center space-y-1">
        <p className="text-sm font-bold text-slate-700 flex items-center justify-center gap-1.5">
          Thank you for helping us improve! <span className="text-[#5D3FD3]">♥</span>
        </p>
        <p className="text-xs font-semibold text-slate-400">
          © 2024 Acowale. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
