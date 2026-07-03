import AdminLayout from '../components/AdminLayout';
import RecentFeedbackTable from '../components/RecentFeedbackTable';

export default function FeedbackListPage() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Feedback Management</h2>
          <p className="text-sm font-medium text-slate-500">View, search, and manage all customer feedback.</p>
        </div>
      </div>

      <RecentFeedbackTable />
    </AdminLayout>
  );
}
