const shimmer = 'absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]'
const bone = 'bg-zinc-800/80 rounded animate-pulse'
const card = 'glass-card rounded-3xl relative overflow-hidden'

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] w-full">

      {/* hero */}
      <div className={`md:col-span-2 p-8 flex flex-col justify-between h-[220px] ${card}`}>
        <div className={shimmer} />
        <div className="space-y-4">
          <div className={`h-4 w-1/4 ${bone}`} />
          <div className={`h-8 w-3/5 rounded-xl ${bone}`} />
        </div>
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${bone}`} />
          <div className="space-y-2 flex-1">
            <div className={`h-3 w-1/3 ${bone}`} />
            <div className={`h-3 w-1/2 ${bone}`} />
          </div>
        </div>
      </div>

      {/* metric */}
      <div className={`p-8 flex flex-col justify-between h-[220px] ${card}`}>
        <div className={shimmer} />
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-xl ${bone}`} />
          <div className={`w-16 h-6 rounded-full ${bone}`} />
        </div>
        <div className="space-y-3">
          <div className={`h-7 w-2/3 rounded-lg ${bone}`} />
          <div className={`h-3 w-full ${bone}`} />
        </div>
      </div>

      {/* courses */}
      {[1,2,3,4].map(i => (
        <div key={i} className={`p-6 flex flex-col justify-between h-[200px] ${card}`}>
          <div className={shimmer} />
          <div className="flex justify-between items-start">
            <div className={`w-12 h-12 rounded-2xl ${bone}`} />
            <div className={`w-8 h-8 rounded-full ${bone}`} />
          </div>
          <div className="space-y-4">
            <div className={`h-5 w-4/5 rounded-lg ${bone}`} />
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className={`h-3 w-1/6 ${bone}`} />
                <div className={`h-3 w-1/12 ${bone}`} />
              </div>
              <div className="h-2 w-full bg-zinc-800/60 rounded-full overflow-hidden">
                <div className={`h-full w-1/3 rounded-full ${bone}`} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* activity */}
      <div className={`md:col-span-2 p-8 flex flex-col min-h-[220px] ${card}`}>
        <div className={shimmer} />
        <div className="flex justify-between items-center mb-6">
          <div className={`h-5 w-1/4 rounded-lg ${bone}`} />
          <div className={`h-4 w-20 rounded-lg ${bone}`} />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.05}s` }}
              className="aspect-square bg-zinc-800/50 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* milestones */}
      <div className={`p-8 flex flex-col min-h-[220px] ${card}`}>
        <div className={shimmer} />
        <div className={`h-5 w-1/3 rounded-lg ${bone}`} />
        <div className="space-y-4 mt-4">
          {[1,2].map(i => (
            <div key={i} className="flex gap-3 items-center">
              <div className={`w-10 h-10 rounded-full flex-shrink-0 ${bone}`} />
              <div className="flex-1 space-y-2">
                <div className={`h-3 w-2/3 ${bone}`} />
                <div className={`h-2.5 w-1/2 ${bone}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}