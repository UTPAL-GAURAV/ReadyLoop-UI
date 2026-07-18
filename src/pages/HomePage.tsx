import { useApplications } from '@/hooks/useApplications'
import { ApplicationCard } from '@/components/applications/ApplicationCard'
import { EmptyHome } from '@/components/home/EmptyHome'
import { Skeleton } from '@/components/ui/skeleton'
import { WakingUp } from '@/components/ui/waking-up'

export function HomePage() {
  const { data: applications, isLoading, isError, isFetching, failureCount } = useApplications()

  if (isLoading || (isError && failureCount < 4 && isFetching)) {
    if (failureCount > 0) return <WakingUp />
    return (
      <div className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !applications || applications.length === 0) {
    return <EmptyHome />
  }

  return (
    <div className="pt-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Your Applications</h1>
        <span className="text-xs text-muted-foreground">{applications.length} total</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map(app => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
