import { Link } from 'react-router-dom'
import { MapPin, Calendar } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { JobApplication } from '@/types'

function deriveStatus(rounds?: JobApplication['rounds']): { label: string; variant: 'success' | 'warning' | 'muted' } {
  if (!rounds || rounds.length === 0) return { label: 'No rounds', variant: 'muted' }
  const statuses = rounds.map(r => r.status)
  if (statuses.every(s => s === 'cleared')) return { label: 'All cleared', variant: 'success' }
  if (statuses.some(s => s === 'failed' || s === 'cleared')) return { label: 'In progress', variant: 'warning' }
  return { label: 'Not started', variant: 'muted' }
}

export function ApplicationCard({ app }: { app: JobApplication }) {
  const status = deriveStatus(app.rounds)

  return (
    <Link to={`/applications/${app.id}`}>
      <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{app.company}</h3>
              <p className="text-sm text-muted-foreground truncate">{app.role}</p>
            </div>
            <Badge variant="mono" className="shrink-0 text-[10px]">{app.shortId}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {app.level && <Badge variant="secondary">{app.level}</Badge>}
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {app.geography && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />{app.geography}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(app.createdAt).toLocaleDateString()}
            </span>
          </div>
          {app.rounds && (
            <p className="text-xs text-muted-foreground">{app.rounds.length} round{app.rounds.length !== 1 ? 's' : ''}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
