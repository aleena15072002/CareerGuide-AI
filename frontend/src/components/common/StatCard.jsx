export default function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{helper}</p></div>
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon size={19} /></div>
      </div>
    </div>
  );
}