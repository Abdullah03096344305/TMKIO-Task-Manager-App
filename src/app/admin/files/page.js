import { requireAdmin } from '@/lib/auth'
import FileSystemDashboardPanel from '@/components/admin/FileSystemDashboardPanel'

export default async function Page() {
  try {
    await requireAdmin()

    return <FileSystemDashboardPanel />
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-200">
        <div className="max-w-md rounded-3xl border border-slate-800 bg-[#11141d] p-8 text-center shadow-xl shadow-slate-950/50">
          <h1 className="text-3xl font-bold mb-4">Access denied</h1>
          <p className="text-sm text-slate-400 mb-6">You need an Admin role to view this page.</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-600">{error?.message || 'Unauthorized access'}</p>
        </div>
      </div>
    )
  }
}
