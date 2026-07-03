import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitFeedback } from '../services/api';
import { FeedbackCategory } from '../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm, Controller } from 'react-hook-form';
import { Mail, Send, Lock, Package, Zap, LayoutGrid, CreditCard, MoreHorizontal, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const CATEGORY_UI = [
  { id: FeedbackCategory.PRODUCT, label: 'Product', icon: Package },
  { id: FeedbackCategory.SERVICE, label: 'Service', icon: Zap },
  { id: FeedbackCategory.SUPPORT, label: 'Support', icon: LayoutGrid },
  { id: FeedbackCategory.BILLING, label: 'Billing', icon: CreditCard },
  { id: FeedbackCategory.OTHER, label: 'Other', icon: MoreHorizontal },
];

const schema = z.object({
  category: z.nativeEnum(FeedbackCategory, { 
    errorMap: () => ({ message: 'Please select a category' }) 
  }),
  comment: z.string().trim().min(1, 'Please enter your feedback before submitting').max(1000, 'Maximum 1000 characters allowed'),
  email: z.string().trim().transform(val => val === '' ? undefined : val).pipe(z.string().email('Please enter a valid email address').optional()),
});

type FormData = z.infer<typeof schema>;

export default function FeedbackForm() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, control, reset } = useHookForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const comment = watch('comment') || '';

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setSuccess(true);
      setErrorMessage('');
      reset();
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to submit feedback. Please try again.';
      setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
    }
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      ...data,
      name: 'Anonymous',
      email: data.email || undefined,
      rating: 5,
    });
  };

  if (success) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center space-y-4 w-full relative z-10 mt-8">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900">Thank you!</h3>
        <p className="text-slate-500 font-medium text-lg">Your feedback helps us improve Acowale.</p>
        <div className="pt-6">
          <button 
            onClick={() => setSuccess(false)}
            className="px-8 py-3 bg-[#5D3FD3] text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 w-full relative z-10 mt-4">
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Category Field - Upgraded to Selectable Grid */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            Select a category <span className="text-red-500">*</span>
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className={cn(
                    "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] focus:border-transparent transition-all flex items-center justify-between hover:bg-slate-100",
                    errors.category ? "border-red-300 focus:ring-red-500" : ""
                  )}
                >
                  <span className={field.value ? "text-slate-700 font-bold" : "text-slate-500"}>
                    {field.value 
                      ? (
                        <div className="flex items-center gap-2">
                          {(() => {
                            const selectedCat = CATEGORY_UI.find(c => c.id === field.value);
                            const Icon = selectedCat?.icon;
                            return (
                              <>
                                {Icon && <Icon className="w-4 h-4 text-[#5D3FD3]" />}
                                {selectedCat?.label}
                              </>
                            );
                          })()}
                        </div>
                      ) 
                      : 'Select a category...'}
                  </span>
                  <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", isCategoryDropdownOpen && "rotate-180")} />
                </button>

                {isCategoryDropdownOpen && (
                  <>
                    {/* Invisible overlay to close dropdown when clicking outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsCategoryDropdownOpen(false)}></div>
                    
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden py-2">
                      {CATEGORY_UI.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = field.value === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              field.onChange(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 flex items-center gap-3 text-left transition-colors hover:bg-slate-50",
                              isSelected ? "bg-[#F3F0FF] text-[#5D3FD3]" : "text-slate-700"
                            )}
                          >
                            <Icon className={cn("w-4 h-4", isSelected ? "text-[#5D3FD3]" : "text-slate-400")} />
                            <span className="text-sm font-bold flex-1">{cat.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#5D3FD3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          />
          {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
        </div>

        {/* Feedback Field */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            Your feedback <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea 
              {...register('comment')}
              rows={4}
              className={cn(
                "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] focus:border-transparent transition-all focus:bg-white resize-none",
                errors.comment ? "border-red-300 focus:ring-red-500" : ""
              )}
              placeholder="Share your thoughts, suggestions, or issues..."
            />
            <div className="absolute bottom-4 right-4 text-[11px] font-bold text-slate-400">
              {comment.length} / 1000
            </div>
          </div>
          {errors.comment && <p className="text-red-500 text-xs mt-1 font-medium">{errors.comment.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            Your email <span className="text-slate-400 font-medium">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              {...register('email')}
              type="email"
              className={cn(
                "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] focus:border-transparent transition-all focus:bg-white",
                errors.email ? "border-red-300 focus:ring-red-500" : ""
              )}
              placeholder="you@example.com"
            />
          </div>
          <p className="text-xs text-slate-500 font-semibold pt-1 pl-1">We'll never share your email.</p>
          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#5D3FD3] hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Send className="w-4 h-4" />
            {mutation.isPending ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>

        {/* Security Note */}
        <div className="pt-1 flex items-center justify-center gap-1.5 text-slate-500 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Your feedback is secure and anonymous.</span>
        </div>
      </form>
    </div>
  );
}
