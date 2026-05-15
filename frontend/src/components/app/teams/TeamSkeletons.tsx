import { Skeleton } from "@/components/ui/skeleton"

const ISI_BLUE = "#0055A4"

/** Skeleton for TeamOverviewCard — Team info + Members section */
const TeamOverviewSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* ── Team Info Card Skeleton ── */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {/* Top gradient accent */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${ISI_BLUE}, #60a5fa, #818cf8)` }}
        />

        <div className="p-6 md:p-8">
          {/* Team name + badge row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-11 h-11 rounded-2xl" />
              <div>
                <Skeleton className="h-6 w-48 rounded-lg" />
                <Skeleton className="h-3 w-24 rounded mt-2" />
              </div>
            </div>
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>

          {/* Project info skeleton */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-start gap-3">
              <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-3 w-20 rounded mb-2" />
                <Skeleton className="h-4 w-52 rounded" />
                <Skeleton className="h-3 w-72 rounded mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Members Section Skeleton ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-5 w-44 rounded" />
            <Skeleton className="h-3 w-32 rounded mt-2" />
          </div>
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>

        {/* Member cards skeleton */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Skeleton for a single MemberCard */
const MemberCardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div>
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-16 rounded mt-1.5" />
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-2.5">
        <Skeleton className="h-3.5 w-44 rounded" />
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-3.5 w-36 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex justify-between mt-4">
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  )
}

/** Skeleton for Select fields inside modals */
const SelectFieldSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-16 rounded" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  )
}

export { TeamOverviewSkeleton, MemberCardSkeleton, SelectFieldSkeleton }
