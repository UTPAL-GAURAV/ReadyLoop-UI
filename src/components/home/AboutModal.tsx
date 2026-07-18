import { BrainCircuit, Globe, MessageSquareMore, History, FileSearch, Coins } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const features = [
  {
    icon: BrainCircuit,
    title: 'JD-AWARE INTERVIEW PLAN',
    desc: 'Paste any job description — Claude reads it, identifies the company, role and level, and generates a full structured interview plan with the right rounds for that org.',
  },
  {
    icon: Globe,
    title: 'COMPANY & GEOGRAPHY CALIBRATED',
    desc: 'Questions are calibrated to the company type and region. A FAANG US role gets different depth than a European enterprise mid-level role. No generic prep.',
  },
  {
    icon: MessageSquareMore,
    title: 'ADAPTIVE FOLLOW-UP QUESTIONING',
    desc: 'Claude grills you on weak spots within each topic — probing deeper, asking for clarification — without derailing into unrelated questions.',
  },
  {
    icon: History,
    title: 'FULL ATTEMPT HISTORY',
    desc: 'Every session is saved. Pick up any round where you left off, or replicate a round to get a fresh non-overlapping question set.',
  },
  {
    icon: FileSearch,
    title: 'SELF-ASSESSMENT BREAKDOWN',
    desc: 'After every round, see your answer, strong points, what you missed, and exactly what the interviewer wanted to hear — per question.',
  },
  {
    icon: Coins,
    title: 'ZERO COST',
    desc: 'Uses your own Claude token (corporate or personal). No subscription. No paywall. Deploy yourself on free tiers.',
  },
]

export function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            What is this app?
          </DialogTitle>
          <DialogDescription>Your AI-powered interview preparation loop</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Most candidates bounce between YouTube videos, mock sites, and random question banks — spending more time searching than actually preparing.{' '}
          <strong>ReadyLoop is the single place where everything lives:</strong> your interview plans, your answers, your weak spots, your progress — all tied to <em>you</em> and the specific role you're targeting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-border bg-muted/40 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{title}</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground pt-3 border-t border-border">
          <strong>How it works:</strong> Clone the agent repo, copy your token from the header, paste it in{' '}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">.env</code> as{' '}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">GOOGLE_AUTH_TOKEN=...</code>, and paste a JD in your Claude session. Claude reads CLAUDE.md automatically — no extra setup.
        </p>
      </DialogContent>
    </Dialog>
  )
}
